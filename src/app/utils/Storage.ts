import AsyncStorage from "@react-native-async-storage/async-storage";
import { Student } from "../interfaces/Student";
import { Channel } from "../interfaces/Channel";
import { Chat } from "../interfaces/Chat";

export function saveStudent(student: Student){
    return AsyncStorage.setItem('userdata', JSON.stringify(student))
}

export async function getStudent() : Promise<Student>{
    const userdata = await AsyncStorage.getItem('userdata');
    if(userdata){
        return JSON.parse(userdata) as Student;
    }
    return null;
}

export async function saveChannels(channels: Channel[]){
    return AsyncStorage.setItem('channels', JSON.stringify(channels))
}

export async function getChannels(){
    const data = await AsyncStorage.getItem('channels');

    if(!data){
        return [];
    }

    return JSON.parse(data) as Channel[];

}

export async function saveChats(chats: Chat[], channelId: string){
    return AsyncStorage.setItem(`chats:${channelId}`, JSON.stringify(chats))
}

export async function getChats(channelId: string){
    const data = await AsyncStorage.getItem(`chats:${channelId}`);

    if(!data){
        return [];
    }

    return JSON.parse(data) as Chat[];

}