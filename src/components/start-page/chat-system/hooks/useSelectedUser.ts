import {useState} from "react";


export const useSelectedUser = () => {
    const [userSelected, setUserSelected] = useState({
        id:'',
        name:'',
    });

    return {
        userSelected,
        setUserSelected,
    }
}