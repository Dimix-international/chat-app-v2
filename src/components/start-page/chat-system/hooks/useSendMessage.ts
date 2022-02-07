import {useCallback, useEffect, useState} from "react";
import {socket} from "../../../../constants/constant";
import {sortNames} from "../../../../helpers/sort-names";
import {GroupMessagesType, InfoMessageType} from "../../../../types/types";



export const useSendMessage = () =>{

/*    const [groupMessage, setGroupMessage] = useState<GroupMessagesType>({});

    const sendMessage = useCallback((data:InfoMessageType) => {
        socket.emit('send_message', data);
        console.log(data)
        const key = sortNames(data.senderUser, data.receivedUser);

        if(key in groupMessage) {
            groupMessage[key as keyof typeof groupMessage].push(data)
        } else {
            groupMessage[key as keyof typeof groupMessage]  = [data]
        }

        setGroupMessage({...groupMessage});

    },[groupMessage])
    console.log('group-message', groupMessage)

    return {
        sendMessage,
        groupMessage,
        setGroupMessage,
    }*/
}