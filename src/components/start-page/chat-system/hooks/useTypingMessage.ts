import {useCallback} from "react";
import {socket} from "../../../../constants/constant";
import {UserTypingMessageType} from "../../../../types/types";


export const useTypingMessage = () => {

    const typingMessage = useCallback((data: UserTypingMessageType) => {
        socket.emit('client-typing_message', data);
    }, [])

    return {
        typingMessage,
    }
}