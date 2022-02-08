import {ReactNode, useMemo, useReducer} from "react";
import {chatReducer} from "../reducers/chat-reducer";
import {ChatContext} from "../context/chat-context";


export const ChatProvider = ({children}:{children:ReactNode}) => {
    const [chatState,chatDispatch ] = useReducer(chatReducer, null);

    const value = useMemo(()=> ({
        chatState,
        chatDispatch
    }),[chatState]);

    return <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
}