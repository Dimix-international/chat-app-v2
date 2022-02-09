import React, {FormEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {useSendMessage} from "../../hooks/useSendMessage";
import {GroupMessagesType} from "../../../../../types/types";
import {sortNames} from "../../../../../helpers/sort-names";
import {convertBase64} from "../../../../../helpers/converter-base64";
import {useGoToBottom} from "../../hooks/useGoToBottom";
import 'emoji-mart/css/emoji-mart.css'; //иконки emojiIcon.png
import {HeaderMessages} from "./HeaderMessages";
import {BodyMessagesArea} from "./BodyMessagesArea";
import {ShowAddedFiles} from "./ShowAddedFiles";
import {useClickOutside} from "../../../../../hooks/useOutsideClick";
import {useWatchTypingUser} from "../../hooks/useWathTypingUser";
import {useTypingMessage} from "../../hooks/useTypingMessage";
import {MessagesForm} from "./MessagesForm";


type TStepThree = {
    userId: string
    selectedUser: { id: string, nickName: string } | null
    avatarUser: string
    chatState: GroupMessagesType | null
    onChatClose: () => void
}
export const MessagesControl: React.FC<TStepThree> = React.memo((props) => {
    const {selectedUser, avatarUser, userId, chatState, onChatClose} = props;
    const {sendMessage} = useSendMessage();
    const {typingMessage} = useTypingMessage();
    const {userTyping} = useWatchTypingUser();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
    } = useForm({mode: 'onChange'});

    const [showAddedFile, setShowAddedFile] = useState<Array<string> | null>(null);

    const [showEmoji, setShowEmoji] = useState(false);

    const handleEmojiShow = () => {
        setShowEmoji(v => !v)
    };

    const handleEmojiSelect = (e: any) => {
        setValue('text', getValues().text + e.native, {
            shouldDirty: true
        })
    };
    const emojiRef = useClickOutside(() => {
        //закрываем меню при клике снаружи
        setShowEmoji(false);
    })

    const sendMessageHandler = (data: any) => {
        if (!data.text && !showAddedFile?.length) return
        typingMessageHandler(false);
        sendMessage({
            senderUser: userId,
            receivedUser: selectedUser?.id || '',
            textMessage: data.text,
            media: showAddedFile,
            avatar: avatarUser,
            isViewMessages: false,
            isTypingMessage: false,
        })
        reset();
        setShowAddedFile(null);
    }

    const typingMessageHandler = (isTyping: boolean) => {
        typingMessage({
            receivedUser: selectedUser?.id || '',
            isTypingMessage: isTyping,
            avatar: avatarUser,
            textMessage: '...',
        })
    }

    const messages = chatState ? chatState[sortNames(userId, selectedUser?.id || '')] : null;

    const showFile = async (e: FormEvent<HTMLFormElement>) => {
        const values = getValues();
        const eventName = (e.target as HTMLFormElement).name;

        if (values.text || values.file.length) {
            typingMessageHandler(true)
        } else {
            typingMessageHandler(false)
        }
        if (values.file.length && eventName !== 'text') {
            let mediaFile = await convertBase64(values.file[0]) as string;
            setShowAddedFile(showAddedFile ? [...showAddedFile, mediaFile] : [mediaFile])
        }
    };

    const resetFile = (file: string) => {
        const values = getValues();
        const index = showAddedFile?.indexOf(file);
        if (index !== undefined && index > -1) {
            if (showAddedFile?.length === 1) {
                setShowAddedFile([])
                !values.text && typingMessageHandler(false)

            } else {
                const newArray = showAddedFile?.splice(index, 1);
                newArray && setShowAddedFile([...newArray])
            }
        }
    };

   useGoToBottom(userId, selectedUser?.id || ''); //скорлинг автоматический

    return (
        <>
            <HeaderMessages onChatClose={onChatClose}
                            nickName={selectedUser?.nickName || ''}/>
            <BodyMessagesArea userId={userId} messages={messages}
                              showEmoji={showEmoji}
                              handleEmojiSelect={handleEmojiSelect}
                              emojiRef={emojiRef}
                              userTyping={userTyping}

            />
            <MessagesForm
                handleSubmit={handleSubmit}
                register={register}
                showFile={showFile}
                handleEmojiShow={handleEmojiShow}
                showAddedFile={showAddedFile}
                sendMessageHandler={sendMessageHandler}

            />
            {
                showAddedFile && <ShowAddedFiles showAddedFile={showAddedFile}
                                                 resetFile={resetFile}/>
            }
        </>
    )
})
