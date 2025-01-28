import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { axiosInstance } from "./Core";

type ChannelBody = {
    channelName: string,
    channelDescription: string,
    channelType: string
}

export async function createChannel(channel: ChannelBody, adminId: string){
    const reqBody = channel
    
    const response = await axiosInstance.post(`channel/createChannel/${adminId}`, reqBody);

    console.log(response.data);

    return response as AxiosResponse<ApiResponse, any>;

}