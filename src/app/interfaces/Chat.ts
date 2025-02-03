import { Member } from "./Member"

export type AttachmentType = 'image' | 'video' | 'audio' | 'document';
export interface Chat{
    id:string,
    senderId:string,
    senderProfile:string,
    channelId:string,
    message?:string,
    attachment?:string,
    fileName?:string,
    thumbnail?:string,
    attachmentType:AttachmentType,
    messageType:'chat' | 'update' |'member' | 'create'
    timestamp:string,
    readReceipt:string[],
}