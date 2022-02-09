export type UserType = { id: string; nickName: string;}
export type UsersType = {
    [key: string]: UserType
}
export type InfoMessageType = {
    senderUser:string
    receivedUser:string;
    textMessage:string;
    avatar:string;
    media:Array<string> | null;
    isViewMessages:boolean;
    isTypingMessage: boolean;
}

export type GroupMessagesType = {
    [key:string]: InfoMessageType[]
}

export type UpdateViewCountType = {
    senderId:string;
    receiverId:string
}

export type UserTypingMessageType = {
    receivedUser:string;
    isTypingMessage: boolean;
    avatar:string;
    textMessage:string;
}