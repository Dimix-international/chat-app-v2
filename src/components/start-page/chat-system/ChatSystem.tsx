import React, {useCallback, useRef, useState} from "react";
import {CreateUser} from "./steps/create-user/CreateUser";
import {OnlineUsers} from "./steps/online-users/OnlineUsers";
import {MessagesControl} from "./steps/messages-control/MessagesControl";
import {useCreateUser} from "./hooks/useCreateUser";
import {useChat} from "../../../hooks/useChat";
import {useGetMessage} from "./hooks/useGetMessage";
import {UpdateViewCountType, UserType} from "../../../types/types";
import {sortNames} from "../../../helpers/sort-names";
import {useGetOnlineUsers} from "./hooks/useGetOnlineUsers";

export const ChatSystem = React.memo((props) => {

    const [step, setStep] = useState(0);
    const {newUserCreated, createUser} = useCreateUser();
    const {chatState, chatDispatch} = useChat();
    const {onlineUsers} = useGetOnlineUsers();

    const selectedUser = useRef<{ nickName: string, id: string } | null>(null);

    const createUserHandler = useCallback((name: string) => {
        const avatar = Math.floor(Math.random() * 8) + 1 + '.png';
        createUser(name, avatar);
        setStep(prevStep => prevStep + 1);
    }, [createUser])

    const onUserSelect = useCallback((name: string, id: string) => {
        selectedUser.current = {id, nickName: name};
        setStep(prevStep => prevStep + 1)
    }, [])

    const checkUnseenMessages = useCallback((receiver: UserType) => {

        const key = sortNames(newUserCreated.current?.userId || '', receiver.id);
        let unseenMessages = [];
        if (chatState) {
            if (key in chatState) {
                unseenMessages = chatState[key].filter(msg => !msg.isViewMessages)
            }
        }
        return unseenMessages.length;
    }, [chatState, newUserCreated])

    const onChatClose = useCallback(() => {
        setStep(1);
        chatDispatch({
            type: 'update-view-count', payload: {
                senderId: newUserCreated.current?.userId || '',
                receiverId: selectedUser.current?.id
            } as UpdateViewCountType
        });
        selectedUser.current = null;
    }, [chatDispatch, newUserCreated])

    useGetMessage(); //получаем сообщения с сервера

    return (
        <div className={'chat-system'}>
            <div className={'chat-box'}>
                {
                    step === 0 &&
                    <CreateUser createUserHandler={createUserHandler}/>

                }
                {
                    step === 1 &&
                    <OnlineUsers userId={newUserCreated.current?.userId || ''}
                                 onUserSelect={onUserSelect}
                                 checkUnseenMessages={checkUnseenMessages}
                                 onlineUsers={onlineUsers}
                    />
                }
                {
                    step === 2 && <MessagesControl
                        userId={newUserCreated.current?.userId || ''}
                        avatarUser={newUserCreated.current?.avatar || ''}
                        selectedUser={selectedUser.current}
                        chatState={chatState}
                        onChatClose={onChatClose}
                    />
                }
            </div>
        </div>

    )
})