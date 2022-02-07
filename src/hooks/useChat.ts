import {useContext} from "react";
import {ChatContext} from "../context/chat-context";

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used inside a useChatProvied');
    return context;
}