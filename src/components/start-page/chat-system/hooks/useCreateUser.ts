import {useCallback, useState} from "react";
import {socket} from "../../../../constants/constant";

type NewUserType = {
    avatar: string,
    userId: string,
}
export const useCreateUser = () => {
    const [newUserCreated, setNewUser] = useState<NewUserType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const createUser = useCallback((userName: string, avatar:string) => {
        socket.emit('new_user', userName, (id: string) => {
            setNewUser({userId:id, avatar})
        })
    }, [])

    return {
        createUser,
        newUserCreated,
    }
}