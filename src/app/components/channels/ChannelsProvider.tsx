import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { Channel } from "../../interfaces/Channel";
import { distinctList } from "../../utils/ArrayUtils";
import { getChannels, saveChannels, saveChats } from "../../utils/Storage";
import { useStudent } from "../students/StudentProvider";
import { Client, Stomp } from "@stomp/stompjs";
import { useStompClient } from "../../context/StompClientContext";
import { ApiResponse } from "../../interfaces/ApiResponse";

interface ChannelsAPI {
    channels: Channel[],
    setChannels: (channels: Channel[]) => void,
    addChannel: (channel: Channel) => void,
    removeChannel: (channelId: string) => void,
}

const ChannelsContext = createContext<ChannelsAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting channels globally within the app.
 * 
 * Must be used within `ChannelsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChannels = (): ChannelsAPI =>{
    const context = useContext(ChannelsContext);

    if(!context){
        throw new Error("useChannels must be used withing ChannelsProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to a channel based on the `channelId`.
 * This can be used anywhere.
 * 
 * Must be used within `ChannelsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChannel = (channelId: string | String) : Channel  =>{
    const context = useContext(ChannelsContext);

    if(!context){
        throw new Error("useChannel must be used withing ChannelsProvider");
    }

    const channel = context.channels.find(channel => channel.id === channelId);

    if(!channel){
        throw new Error("Channel couldn't be found");
    }

    return channel;
}

const channelCompareFn = (a:Channel, b:Channel)=> (new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime());

/**
 * Provider responsible for exposing channels context in the app globally.
 * Listens to channels websocket and updates them
 * Must be used within the `StudentProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function ChannelsProvider({children}: {children: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();


    const [channels, setChannelsRaw] = useState<Channel[]>([]);

    const {student} = useStudent();

    // To initialize the channels from local storage
    useEffect(()=>{
        getChannels().then((_channels)=> setChannels(_channels));
    }, [])

    useEffect(()=>{
        saveChannels(channels)
    }, [channels])

    

    useEffect(()=>{
        
        if(!student) {
            console.log("Student is null");
            return;
        };

      

        subscribe(`/channels/${student.id}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got channels`, data);

            if (Array.isArray(data)) {
                const _channels = data.map((channel) => channel as Channel);
                setChannels(_channels);
            } else {
                const channelData = data as Channel;
                addChannel(channelData);
            }
        });

        publish(`/scholarly/getChannels/${student.id}`)

    }, [student])
    
    const addChannel = useCallback((channel: Channel)=>{
        
        setChannelsRaw((prevChannels)=> distinctList([...prevChannels, channel], 'id', channelCompareFn))

    }, [])

    const setChannels = useCallback((_channels: Channel[])=>{
        setChannelsRaw(distinctList(_channels, 'id'))  
    }, [])

    const removeChannel = useCallback((channelId: string)=>{
        const capturedChannels = [...channels]
        const filtered = capturedChannels.filter(channel => channel.id !== channelId);

        setChannelsRaw(distinctList(filtered, 'id', channelCompareFn));
    }, [])

    return <ChannelsContext.Provider value={{ channels, addChannel, setChannels, removeChannel}}>
        {children}
    </ChannelsContext.Provider>
}