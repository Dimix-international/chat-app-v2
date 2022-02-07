import React from "react";
import {Header} from "./Header";
import {ChatSystem} from "./chat-system/ChatSystem";

export const StartPage = React.memo((props) => {
    return (
        <>
            <Header />
            <ChatSystem />
        </>
    )
})