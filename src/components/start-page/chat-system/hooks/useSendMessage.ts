import {useCallback} from "react";
import {socket} from "../../../../constants/constant";
import {InfoMessageType} from "../../../../types/types";
import {useChat} from "../../../../hooks/useChat";


export const useSendMessage = () => {
    const {chatDispatch} = useChat();

    const sendMessage = useCallback((data: InfoMessageType) => {
        socket.emit('send_message', data);
        chatDispatch({type: 'add-message', payload: data})
    }, [chatDispatch])

    return {
        sendMessage,
    }
}