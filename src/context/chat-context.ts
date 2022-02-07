import {GroupMessagesType, InfoMessageType} from "../types/types";
import {createContext} from "react";


export enum ChatContextActionOperationType {
    AddGroupMessages = 'add-group-messages',
    AddMessage = 'add-message',
    Default = 'default'
}

export type ChatActionsType = {
    type: `${ChatContextActionOperationType}`
    payload: InfoMessageType
}

export type ChatDispatchType = (action:ChatActionsType) => void;
export type ChatContextType = {chatState:GroupMessagesType, chatDispatch:ChatDispatchType};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);