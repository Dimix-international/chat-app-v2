import {useEffect} from "react";
import {useChat} from "../../../../hooks/useChat";
import {goToBottom} from "../../../../helpers/goToBottom";
import {sortNames} from "../../../../helpers/sort-names";

export const useGoToBottom = (senderId:string, receiverId:string) => {
    const {chatState} = useChat();

    useEffect(() => {
        const key = sortNames(senderId, receiverId);
        if(chatState) {
            key in chatState && chatState[key].length > 0 && goToBottom('.message-area ul')
        }
    },[chatState,receiverId,senderId]);
}



