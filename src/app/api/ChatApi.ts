import { AxiosResponse } from "axios";
import { Chat } from "../interfaces/Chat";
import { axiosInstance } from "./Core";
import { ApiResponse } from "../interfaces/ApiResponse";

export async function sendChat(channelId:string, chat:Chat){
    
    const pathVariables = `${channelId}/${chat.senderId}`;

    const response = await axiosInstance.post(
        `chat/sendChat/${pathVariables}`,
        chat
    );

    return response as AxiosResponse<ApiResponse, any>;
}

export async function sendAttachment(channelId:string, attachment:File|Blob, chat:Chat, thumbnail?:Blob | null){
    console.log("Started")
    const pathVariables = `${channelId}/${chat.senderId}`;
    console.log(attachment)

    const formData = new FormData();
    formData.append('attachment', attachment);
    formData.append('attachmentType', chat.attachmentType);
    if(chat.message){
        formData.append('message', chat.message)
    }

    if(thumbnail && chat.attachmentType === 'video'){
        formData.append('thumbnail', thumbnail);
    }

    const response = await axiosInstance.post(
        `chat/sendAttachment/${pathVariables}`,
        formData,
        {headers:{"Content-Type":'multipart/form-data'}}
    );

    console.log(response);

    return response as AxiosResponse<ApiResponse, any>;
}

export async function markChatAsRead(channelId:string, chatId:string, memberId:string){
    const pathVariables = `${channelId}/${memberId}/${chatId}`;

    const response = await axiosInstance.patch(`chat/markChatAsRead/${pathVariables}`, null)

    return response as AxiosResponse<ApiResponse, any>;
}