import { Children, createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { Channel } from "../../interfaces/Channel";
import { distinctList } from "../../utils/ArrayUtils";
import { getChannels, getChats, saveChats } from "../../utils/Storage";
import { useStudent } from "../students/StudentProvider";
import { Client, Stomp } from "@stomp/stompjs";
import { useStompClient } from "../../context/StompClientContext";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Chat } from "../../interfaces/Chat";
import { ScreenProps } from "../../../../navigation";

interface ChatsAPI {
    chats: Chat[],
    setChats: (chats: Chat[]) => void,
    addChat: (chat: Chat) => void,
    removeChat: (chatId: string) => void,
}

const ChatsContext = createContext<ChatsAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting chats of a channel globally within the app.
 * 
 * Must be used within `ChatsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChats = (): ChatsAPI =>{
    const context = useContext(ChatsContext);

    if(!context){
        throw new Error("useChats must be used withing ChatsProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to a cht based on the `chatId`.
 * This can be used anywhere.
 * 
 * Must be used within `ChatsProvider`
 * @author Teninlanimi Taiwo
 */
export const useChat = (chatId: string | String) : Chat  =>{
    const context = useContext(ChatsContext);

    if(!context){
        throw new Error("useChat must be used withing ChatsProvider");
    }

    const chat = context.chats.find(chat => chat.id === chatId);

    if(!chat){
        throw new Error("Chat couldn't be found");
    }

    return chat;
}

const chatCompareFn = (a:Chat, b:Chat)=> (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

/**
 * Provider responsible for exposing channels context in the app globally.
 * Listens to channels websocket and updates them
 * Must be used within the `StudentProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function ChatsProvider({children, channelId}: {channelId: string | String, children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();


    const [chats, setChatsRaw] = useState<Chat[]>([])

    // To initialize the channels from local storage
    useEffect(()=>{
        getChats(channelId.toString()).then((_chats)=> setChats(_chats));
    }, [])

    useEffect(()=>{

        saveChats(chats, channelId.toString());
    }, [chats])

    

    useEffect(()=>{
        
        if(!channelId) {
            console.log("Channel ID is null");
            return;
        };

      

        subscribe(`/chats/${channelId}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got chats`, data);

            if (Array.isArray(data)) {
                const _chats = data.map((channel) => channel as Chat);
                setChats(_chats);
            } else {
                const chatData = data as Chat;
                addChat(chatData);
            }
        });

        publish(`/scholarly/getChats/${channelId}`)

    }, [channelId])
    
    const addChat = useCallback((chat: Chat)=>{
        setChatsRaw((prevChats)=> distinctList([...prevChats, chat], 'id', chatCompareFn))

    }, [])

    const setChats = useCallback((_chats: Chat[])=>{
        setChatsRaw(distinctList(_chats, 'id'))        
    }, [])

    const removeChat = useCallback((chatId: string)=>{
        const capturedChats = [...chats]
        const filtered = capturedChats.filter(chat => chat.id !== chatId);

        setChatsRaw(distinctList(filtered, 'id', chatCompareFn));
    }, [])

    return <ChatsContext.Provider value={{ chats: chats, addChat, setChats, removeChat}}>
        {children}
    </ChatsContext.Provider>
}