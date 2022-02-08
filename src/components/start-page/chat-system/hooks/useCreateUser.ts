import {useCallback, useRef} from "react";
import {socket} from "../../../../constants/constant";

export type NewUserType = {
    avatar: string,
    userId: string,
}
export const useCreateUser = () => {
    const newUserCreated = useRef<NewUserType | null>(null)

    const createUser = useCallback((userName: string, avatar:string) => {
        socket.emit('new_user', userName, (id: string) => {
            newUserCreated.current = {
                userId:id,
                avatar,
            }
        })
    }, [])

    return {
        createUser,
        newUserCreated,
    }
}