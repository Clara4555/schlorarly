import { Client, CompatClient, IFrame, Stomp } from "@stomp/stompjs"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { websocket_url } from "../api/Core";

type StompClientContextAPI = {
    client?: Client,
    subscribe: (destination: string, callback: (message: IFrame)=>void) => void,
    publish?: (destination: string, body?: string) => void
}

const StompClientContext = createContext<StompClientContextAPI>(null);

/**
 * Responsible for accessing stomp client and websocket globally within the app.
 * 
 * Must be used within `StompClientProvider`
 * @author Teninlanimi Taiwo
 */
export const useStompClient = ()=>{
    const context = useContext(StompClientContext);

    if(!context){
        throw new Error('useStompClient must be used within StompClientProvider');
    }

    return context
}

/**
 * Provider responsible for exposing webcocket and stomp client context in the app globally.
 * @author Teninlanimi Taiwo
 */
export function StompClientProvider({children} : {children?:React.JSX.Element}){
    const [client, setClient] = useState<Client>(null);

    useEffect(()=>{
        initializeClient();

        return ()=>{
            if(client && client.active){
                console.log("Deactivating Client...")

                client.deactivate({force:true});
            }
        }
    }, [])

    const initializeClient = useCallback(()=>{
        console.log("Connecting client....")
        const _c = Stomp.over(()=>new WebSocket(websocket_url));
        _c.reconnectDelay = 5000;
        _c.debug = console.log;
        _c.onConnect = message =>{
            console.log("Connected To Broker");
            setClient(_c);
        }
        _c.appendMissingNULLonIncoming = true;
        _c.forceBinaryWSFrames = true;
        _c.onStompError = frame =>{
            console.error('Broker reported error:', frame.headers['message']);
            console.error('Additional details:', frame.body);
        };
        _c.onDisconnect = frame =>{
            console.error("Client Disconnected");
        }
        _c.activate();
    }, [])

    const subscribe = useCallback((destination: string, callback: (message: IFrame)=>void)=>{
        if(client && client.connected){
            client.subscribe(destination, callback);
        }
    }, [client])

    const publish = useCallback((destination: string, body?:string)=>{
        if(client && client.connected){
            client.publish({destination, body});
        }
    }, [client])


    return <StompClientContext.Provider value={{client, publish, subscribe}}>
        {children}
    </StompClientContext.Provider>
}
