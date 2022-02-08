import React, {FormEvent, useState} from "react";
import {useForm} from "react-hook-form";
import sendIcon from '../../../../../assets/send.png';
import attachment from '../../../../../assets/paper-clip.png';
import {useSendMessage} from "../../hooks/useSendMessage";
import {GroupMessagesType} from "../../../../../types/types";
import {sortNames} from "../../../../../helpers/sort-names";
import {convertBase64} from "../../../../../helpers/converter-base64";
import {useGoToBottom} from "../../hooks/useGoToBottom";
import 'emoji-mart/css/emoji-mart.css'; //иконки emojiIcon.png
import emojiIcon from '../../../../../assets/emojiIcon.png';
import {HeaderMessages} from "./HeaderMessages";
import {BodyMessagesArea} from "./BodyMessagesArea";
import {ShowAddedFiles} from "./ShowAddedFiles";
import {useClickOutside} from "../../../../../hooks/useOutsideClick";


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

    const sendMessageHandler = async (data: any) => {
        if (!data.text && !showAddedFile) return

        sendMessage({
            senderUser: userId,
            receivedUser: selectedUser?.id || '',
            textMessage: data.text,
            media: showAddedFile,
            avatar: avatarUser,
            isViewMessages: false
        })
        reset();
        setShowAddedFile(null);
    }

    const messages = chatState ? chatState[sortNames(userId, selectedUser?.id || '')] : null;

    const showFile = async (e: FormEvent<HTMLFormElement>) => {
        const values = getValues();
        const eventName = (e.target as HTMLFormElement).name;

        if (values.file.length && eventName !== 'text') {
            let mediaFile = await convertBase64(values.file[0]) as string;
            setShowAddedFile(showAddedFile ? [...showAddedFile, mediaFile] : [mediaFile])
        }
    };

    const resetFile = (file: string) => {
        const index = showAddedFile?.indexOf(file);
        if (index !== undefined && index > -1) {
            if (showAddedFile?.length === 1) {
                setShowAddedFile([])
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
                              emojiRef={emojiRef}/>
            <form className={'message-control'}
                  onSubmit={handleSubmit(sendMessageHandler)}
                  onChange={showFile}
            >
                <textarea  {...register('text')}
                           placeholder={'Type your message...'}
                />
                <button style={{background: "#eee"}} type={'button'}
                        onClick={handleEmojiShow}>
                    <img src={emojiIcon} alt="emoji"/>
                </button>
                <div className={'file-input-container'}>
                    <input
                        type="file"
                        {...register('file')} id={'hidden-file'}
                        /*accept={'.jpg,.jpeg,.png, .webm,.mp4,.ogg'}*/
                        accept={'.jpg,.jpeg,.png'}
                        disabled={!!(showAddedFile && showAddedFile?.length > 3)}
                    />
                    <label htmlFor='hidden-file'>
                        <img style={{width: '20px'}} src={attachment}
                             alt="file"/>
                    </label>
                </div>
                <button type={'submit'}>
                    <img src={sendIcon} alt="send"/>
                    <span style={{display: 'inline-block'}}>Send</span>
                </button>
            </form>
            {
                showAddedFile && <ShowAddedFiles showAddedFile={showAddedFile}
                                                 resetFile={resetFile}/>
            }
        </>
    )
})