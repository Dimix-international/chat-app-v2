import {
    GroupMessagesType,
    InfoMessageType,
    UpdateViewCountType
} from "../types/types";
import {createContext} from "react";


export enum ChatContextActionOperationType {
    AddMessage = 'add-message',
    GiveNewMessage = 'give-new-message',
    UpdateViewCount = 'update-view-count',
    Default = 'default'
}

export type ChatActionsType = {
    type: `${ChatContextActionOperationType}`
    payload: InfoMessageType | UpdateViewCountType
}

export type ChatDispatchType = (action:ChatActionsType) => void;
export type ChatContextType = {chatState:GroupMessagesType | null, chatDispatch:ChatDispatchType};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);