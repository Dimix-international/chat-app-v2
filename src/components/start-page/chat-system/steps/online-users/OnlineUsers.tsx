import React from "react";
import {useGetOnlineUsers} from "../../hooks/useGetOnlineUsers";


type TStepTwo = {
    userId: string
    onUserSelect: (name: string, id:string) => void
}
export const OnlineUsers: React.FC<TStepTwo> = React.memo((props) => {
    const {userId, onUserSelect} = props;

    const {onlineUsers} = useGetOnlineUsers();

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
                                    <span style={{textTransform: 'capitalize'}}>{user.nickName}</span>
                                    <span className={'new-message-count'}>0</span>
                                </li>
                            )
                        } else return null
                    })
                }
            </ul>
        </>
    )
})