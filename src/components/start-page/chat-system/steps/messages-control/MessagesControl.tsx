import React from "react";
import icon from '../../../../../assets/users/1.png'
import {useForm} from "react-hook-form";
import sendIcon from '../../../../../assets/send.png';
import attachment from '../../../../../assets/paper-clip.png';
import {useSendMessage} from "../../hooks/useSendMessage";
import {InfoMessageType} from "../../../../../types/types";

type TStepThree = {
    userId: string
    selectedUser: { id: string, nickName: string, }
    avatarUser: string
    sendMessage:(data:InfoMessageType) => void
}
export const MessagesControl: React.FC<TStepThree> = React.memo((props) => {
    const {selectedUser, avatarUser, userId, sendMessage} = props;
   // const {sendMessage} = useSendMessage();

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset
    } = useForm();

    const sendMessageHandler = (data: any) => {
        sendMessage({
            senderUser: userId,
            receivedUser: selectedUser.id,
            textMessage: data.text,
            media: data.file,
            avatar: avatarUser,
        })
        reset();
    }


    return (
        <>
            <div className={`online-users-header`}>
                <div style={{margin: '0 10px'}}>
                    {selectedUser.nickName}
                </div>
            </div>
            <div className={'message-area'}>
                <ul>
                    <li>
                        <div className={'user-pic'}>
                            <img src={icon} alt="icon"/>
                        </div>
                        <div className={'message-text'}>
                            your message
                        </div>
                    </li>
                </ul>
            </div>
            <form className={'message-control'}
                  onSubmit={handleSubmit(sendMessageHandler)}>
                <textarea {...register('text', {required: true})}
                          placeholder={'Type your message...'}
                />
                <div className={'file-input-container'}>
                    <input
                        type="file"
                        {...register('file')} id={'hidden-file'}
                        accept={'.jpg,.jpeg,.png, .webm,.mp4,.ogg'}
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
        </>
    )
})