import {sortNames} from "../../../../helpers/sort-names";
import {useChat} from "../../../../hooks/useChat";
import {useCallback, useState} from "react";


export const useCheckUnseenMessages = () => {
    let unseenMessages = 0;
    const {chatState} = useChat();
    //const [unseenMessages, setUnseenMessages] = useState(0)

    const checkUnseenMessages = useCallback((senderId: string, receiverId: string) => {
        const key = sortNames(senderId, receiverId);
        if (chatState) {
            if (key in chatState) {
               // setUnseenMessages(chatState[key].filter(msg => msg.isViewMessages).length)
                unseenMessages = chatState[key].filter(msg => msg.isViewMessages).length
            }
        }
    }, [chatState])

    return {
        unseenMessages,
        checkUnseenMessages,
    }
}