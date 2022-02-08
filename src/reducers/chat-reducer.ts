import {
    ChatActionsType,
    ChatContextActionOperationType
} from "../context/chat-context";
import {
    GroupMessagesType,
    InfoMessageType,
    UpdateViewCountType
} from "../types/types";
import {sortNames} from "../helpers/sort-names";


type ChatReducerReturnType = {
    [key in `${ChatContextActionOperationType}`]: () => GroupMessagesType
}

export const chatReducer = (state: GroupMessagesType | null, action: ChatActionsType): GroupMessagesType | null => {
    let copyState = {...state}

    const sendMessage = (): GroupMessagesType => {
        const key = sortNames((action.payload as InfoMessageType).senderUser,
            (action.payload as InfoMessageType).receivedUser);

        if (key in copyState) {
            copyState[key as keyof typeof copyState] = [...copyState[key as keyof typeof copyState], {
                ...(action.payload as InfoMessageType), isViewMessages: true
            }]
        } else {
            copyState[key as keyof typeof copyState] = [{
                ...(action.payload as InfoMessageType), isViewMessages: true
            }]
        }
        return {...copyState}
    }

    const updateMessageView = (): GroupMessagesType => {

        const key = sortNames((action.payload as UpdateViewCountType).senderId,
            (action.payload as UpdateViewCountType).receiverId);

        if (key in copyState) {
            const messages = copyState[key as keyof typeof copyState].map(msg =>
                !msg.isViewMessages ? {...msg, isViewMessages: true} : msg
            );
            copyState[key as keyof typeof copyState] = [...messages];
            return {...copyState}
        } else {
            return {...copyState}
        }
    }

    const giveNewMessage = (): GroupMessagesType => {
        const key = sortNames((action.payload as InfoMessageType).senderUser,
            (action.payload as InfoMessageType).receivedUser);

        if(key in copyState) {
            copyState[key as keyof typeof copyState] = [
                ...copyState[key as keyof typeof copyState], {...(action.payload as InfoMessageType)}]
        } else{
            copyState[key as keyof typeof copyState] = [(action.payload as InfoMessageType)]
        }
        return {...copyState}
    }

    const chatActions = {
        'add-message': sendMessage,
        'update-view-count': updateMessageView,
        'give-new-message': giveNewMessage,
        'default': () => state,
    } as ChatReducerReturnType;


    return (chatActions[action.type] || chatActions['default'])()
}