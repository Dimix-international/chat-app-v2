import React from "react";
import logo from './../../assets/chat.png'

export const Header = React.memo((props) => {
    return (
        <header className={'app-header'}>
            <img src={logo} alt="logo"/>
            <div className={'app-name b-500 primaryColor'}>
                Dimix chat
            </div>
        </header>

    )
})