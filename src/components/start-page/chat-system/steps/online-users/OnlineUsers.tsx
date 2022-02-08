import React from "react";
import {UsersType, UserType} from "../../../../../types/types";

type TStepTwo = {
    userId: string
    onUserSelect: (name: string, id: string) => void
    checkUnseenMessages: (receiver: UserType) => number
    onlineUsers:UsersType
}
export const OnlineUsers: React.FC<TStepTwo> = React.memo((props) => {
    const {userId, onUserSelect, checkUnseenMessages, onlineUsers} = props;

    return (
        <>
            <div className={`online-users-header`}>
                <div style={{margin: '0 10px'}}>
                    Online users
                </div>
            </div>
            <ul className={'users-list'}>
                {
                    Object.values(onlineUsers).map(user => {
                        if (user.id !== userId) {
                            return (
                                <li key={user.id}
                                    onClick={() => onUserSelect(user.nickName, user.id)}
                                >
                                    <span
                                        style={{textTransform: 'capitalize'}}>{user.nickName}</span>
                                    {
                                        checkUnseenMessages(user) !== 0
                                            ? <span
                                                className={'new-message-count'}>
                                                {checkUnseenMessages(user)}
                                              </span>
                                            : null
                                    }

                                </li>
                            )
                        } else return null
                    })
                }
            </ul>
        </>
    )
})