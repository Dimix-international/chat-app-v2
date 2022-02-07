import React, {useCallback, useEffect, useRef, useState} from "react";
import {CreateUser} from "./steps/create-user/CreateUser";
import {OnlineUsers} from "./steps/online-users/OnlineUsers";
import {MessagesControl} from "./steps/messages-control/MessagesControl";
import {useCreateUser} from "./hooks/useCreateUser";
import {socket} from "../../../constants/constant";
import {useSendMessage} from "./hooks/useSendMessage";
import {sortNames} from "../../../helpers/sort-names";
import {GroupMessagesType, InfoMessageType} from "../../../types/types";


export const ChatSystem = React.memo((props) => {

    const [step, setStep] = useState(0);
    const { createUser, newUserCreated} = useCreateUser();
    //const {setGroupMessage, groupMessage} = useSendMessage();

    const [groupMessage, setGroupMessage] = useState<GroupMessagesType>({});
    const sendMessage = useCallback((data:InfoMessageType) => {
        socket.emit('send_message', data);
        console.log(data)
        const key = sortNames(data.senderUser, data.receivedUser);

        if(key in groupMessage) {
            groupMessage[key as keyof typeof groupMessage].push(data)
        } else {
            groupMessage[key as keyof typeof groupMessage]  = [data]
        }

        setGroupMessage({...groupMessage});

    },[groupMessage])


    const selectedUser = useRef({
        nickName:'',
        id:'',
    })

    const createUserHandler = useCallback((name: string) => {
        const avatar = Math.floor(Math.random() * 8) + '.png';
        createUser(name, avatar);
        setStep(prevStep => prevStep + 1);
    }, [createUser])

    const onUserSelect = useCallback((name: string, id:string) => {
        selectedUser.current.id = id;
        selectedUser.current.nickName = name;
        setStep(prevStep => prevStep + 1)
    }, [])

    useEffect(() => {
        socket.on('new_message', (data) =>{
            setGroupMessage((prevGroupMessages:GroupMessagesType) => {

                const messages = prevGroupMessages;
                const key = sortNames(data.senderUser,data.receivedUser);

                if(key in messages) {
                    messages[key as keyof typeof prevGroupMessages] =
                        [...messages[key as keyof typeof prevGroupMessages], data]
                } else {
                    messages[key as keyof typeof prevGroupMessages] = [data];
                }
                return {...messages}
            })

        })
    },[setGroupMessage]);
    console.log('groupMessage', groupMessage)


    return (
        <div className={'chat-system'}>
            <div className={'chat-box'}>
                {
                    step === 0 && <CreateUser createUserHandler={createUserHandler} />

                }
                {
                    step === 1 && <OnlineUsers userId={newUserCreated?.userId || ''}  onUserSelect={onUserSelect}/>
                }
                {
                    step === 2 && <MessagesControl
                        userId={newUserCreated?.userId || ''}
                        avatarUser={newUserCreated?.avatar || ''}
                        selectedUser={selectedUser.current}
                        sendMessage={sendMessage}
                    />
                }
            </div>
        </div>

    )
})