import AsyncStorage from "@react-native-async-storage/async-storage";
import { Student } from "../interfaces/Student";
import { Channel } from "../interfaces/Channel";

export function saveStudent(student: Student){
    return AsyncStorage.setItem('userdata', JSON.stringify(student))
}

export async function getStudent(){
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