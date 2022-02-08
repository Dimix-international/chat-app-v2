import React, {FormEvent, useState} from "react";
import {useForm} from "react-hook-form";
import sendIcon from '../../../../../assets/send.png';
import attachment from '../../../../../assets/paper-clip.png';
import {useSendMessage} from "../../hooks/useSendMessage";
import {GroupMessagesType} from "../../../../../types/types";
import {sortNames} from "../../../../../helpers/sort-names";
import {giveAvatar} from "../../../../../helpers/giveAvatar";
import {convertBase64} from "../../../../../helpers/converter-base64";
import {useGoToBottom} from "../../hooks/useGoToBottom";

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
    const {register, handleSubmit, reset, getValues} = useForm({mode: 'onChange'});

    const [showAddedFile, setShowAddedFile] = useState<Array<string> | null>(null)

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

    const showFile = async (e:FormEvent<HTMLFormElement>) => {
        const values = getValues();
        const eventName = (e.target as HTMLFormElement).name;

        if (values.file.length && eventName !== 'text') {
            let mediaFile = await convertBase64(values.file[0]) as string;
            setShowAddedFile(showAddedFile ? [...showAddedFile, mediaFile] : [mediaFile])
        }
    }
    const resetFile = (file: string) => {
        const index = showAddedFile?.indexOf(file);
        if (index && index > -1) {
            const newArray = showAddedFile?.splice(index, 1)
            newArray && setShowAddedFile([...newArray])
        }
    }

    useGoToBottom(userId, selectedUser?.id || ''); //скорлинг автоматический

    return (
        <>
            <div className={`online-users-header nickName`}>
                <div onClick={onChatClose} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25"
                         height="25" fill="currentColor"
                         className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
                <div>
                    {selectedUser?.nickName}
                </div>
            </div>
            <div className={'message-area'}>
                <ul>
                    {
                        messages && messages.map((msg, index) => (
                            <li key={index} style={{
                                flexDirection: userId === msg.senderUser
                                    ? 'row'
                                    : 'row-reverse'
                            }}>
                                <div className={'user-pic'}>
                                    <img src={giveAvatar(msg.avatar)} alt="icon"/>
                                </div>
                                <div className={'message-content'}>
                                    {
                                        msg.media && msg.media.map((img, index) => (
                                            <div key={index}
                                                 className={'image-container'}>
                                                <img src={img} alt='picture'/>
                                            </div>
                                        ))
                                    }
                                    {
                                        msg.textMessage &&
                                        <div
                                            className={`message-text ${userId === msg.senderUser ? 'userMessage' : 'senderMessage'}`}>
                                            {msg.textMessage}
                                        </div>
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <form className={'message-control'}
                  onSubmit={handleSubmit(sendMessageHandler)}
                  onChange={showFile}
            >
                <textarea {...register('text')}
                          placeholder={'Type your message...'}
                />
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
                showAddedFile && <div className={'addedImgBody'}>
                    {showAddedFile.map((file, index) => (
                        <div key={index} className={'addedImgContainer'}>
                            <img src={file} alt={'file'}/>
                            <span onClick={() => resetFile(file)}>x</span>
                        </div>
                    ))}
                </div>
            }
        </>
    )
})