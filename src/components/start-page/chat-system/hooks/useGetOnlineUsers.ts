import {useEffect, useState} from "react";
import {socket} from "../../../../constants/constant";
import {UsersType} from "../../../../types/types";


export const useGetOnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState<UsersType>({});

    useEffect(() => {
        socket.on('all-users', (users:UsersType) => {
            setOnlineUsers(users)
        });
    },[])

    return {
        onlineUsers
    }
}