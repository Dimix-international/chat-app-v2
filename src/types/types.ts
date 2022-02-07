export type UserType = { id: string; nickName: string;}
export type UsersType = {
    [key: string]: UserType
}
export type InfoMessageType = {
    senderUser:string
    receivedUser:string;
    textMessage:string;
    avatar:string;
    media:any;
}

export type GroupMessagesType = {
    [key:string]: InfoMessageType[]
}