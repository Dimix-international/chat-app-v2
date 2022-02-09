import {useEffect, useState} from "react";
import {socket} from "../../../../constants/constant";
import {UserTypingMessageType} from "../../../../types/types";

export const useWatchTypingUser = () => {
    const [userTyping, setUserTyping] = useState<UserTypingMessageType | null>(null);

    useEffect(() => {
        socket.on('user-typing_message', (data:UserTypingMessageType) =>{
            setUserTyping({
                avatar: data.avatar,
                textMessage:data.textMessage,
                receivedUser: data.receivedUser,
                isTypingMessage:data.isTypingMessage
            })
        })
    },[]);

    return {
        userTyping
    }
}