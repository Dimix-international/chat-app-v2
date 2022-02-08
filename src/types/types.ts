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
}

export type GroupMessagesType = {
    [key:string]: InfoMessageType[]
}

export type UpdateViewCountType = {
    senderId:string;
    receiverId:string
}

export type CreateUserType = {
    id:string;
    avatar:string
}
export type StateChatType = {
    user:CreateUserType,
    groupMessages: GroupMessagesType
}