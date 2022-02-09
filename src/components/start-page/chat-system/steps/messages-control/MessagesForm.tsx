import React, {FormEvent} from "react";
import emojiIcon from "../../../../../assets/emojiIcon.png";
import attachment from "../../../../../assets/paper-clip.png";
import sendIcon from "../../../../../assets/send.png";
import {
    FieldValues,
    UseFormHandleSubmit,
    UseFormRegister
} from "react-hook-form";

type MessagesFormType = {
    handleSubmit: UseFormHandleSubmit<FieldValues>
    register: UseFormRegister<FieldValues>
    showFile: (e: FormEvent<HTMLFormElement>) => void
    handleEmojiShow:() => void
    showAddedFile:Array<string> | null
    sendMessageHandler:(data:any) => void
}

export const MessagesForm: React.FC<MessagesFormType> = React.memo(props => {

    const {handleSubmit, register, showFile, handleEmojiShow, showAddedFile, sendMessageHandler} = props;


    return (
        <form className={'message-control'}
              onSubmit={handleSubmit(sendMessageHandler)}
              onChange={showFile}
        >
             <textarea
                 {...register('text')}
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
    )
})