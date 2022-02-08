import {useEffect} from "react";
import {socket} from "../../../../constants/constant";
import {useChat} from "../../../../hooks/useChat";

export const useGetMessage = () => {
    const {chatDispatch} = useChat();

    useEffect(() => {
        socket.on('new_message', (data) =>{
            chatDispatch({type:'give-new-message', payload:data})
        })
    },[chatDispatch]);
}