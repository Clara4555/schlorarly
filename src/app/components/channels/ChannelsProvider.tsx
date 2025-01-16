import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { Channel } from "../../interfaces/Channel";
import { distinctList } from "../../utils/ArrayUtils";
import { getChannels } from "../../utils/Storage";

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

const channelCompareFn = (a:Channel, b:Channel)=> (new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime());

/**
 * Provider responsible for exposing channels context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function ChannelsProvider({children}: {children: React.JSX.Element}){
    const [channels, setChannelsRaw] = useState<Channel[]>([]);

    // To initialize the channels from local storage
        useEffect(()=>{
            getChannels().then((_channels)=> setChannels(_channels));
        }, [])
    
    const addChannel = useCallback((channel: Channel)=>{
        
        setChannels([...channels, channel])

    }, [])

    const setChannels = useCallback((_channels: Channel[])=>{
        setChannelsRaw(distinctList([..._channels], 'id', channelCompareFn))
    }, [])

    const removeChannel = useCallback((channelId: string)=>{
        const capturedChannels = [...channels]
        const filtered = capturedChannels.filter(channel => channel.id !== channelId);

        setChannels(filtered);
    }, [])

    return <ChannelsContext.Provider value={{ channels, addChannel, setChannels, removeChannel}}>
        {children}
    </ChannelsContext.Provider>
}