import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { Announcement } from "../../interfaces/Announcement";
import { distinctList } from "../../utils/ArrayUtils";
import { getAnnouncements, saveAnnouncements} from "../../utils/Storage";
import { useStudent } from "../students/StudentProvider";
import { Client, Stomp } from "@stomp/stompjs";
import { useStompClient } from "../../context/StompClientContext";
import { ApiResponse } from "../../interfaces/ApiResponse";

interface AnnouncmentsAPI {
    announcements: Announcement[],
    setAnnouncements: (announcements: Announcement[]) => void,
    addAnnouncement: (announcement: Announcement) => void,
    removeAnnouncement: (announcementId: string) => void,
}

const AnnouncmentsContext = createContext<AnnouncmentsAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting announcments globally within the app.
 * 
 * Must be used within `AnnouncmentsProvider`
 * @author Teninlanimi Taiwo
 */
export const useAnnouncements = (): AnnouncmentsAPI =>{
    const context = useContext(AnnouncmentsContext);

    if(!context){
        throw new Error("useAnnouncments must be used withing AnnouncementsProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to a announcement based on the `announcementId`.
 * This can be used anywhere.
 * 
 * Must be used within `AnnouncementsProvider`
 * @author Teninlanimi Taiwo
 */
export const useAnnouncement = (announcementId: string | String) : Announcement | undefined | null  =>{
    const context = useContext(AnnouncmentsContext);

    if(!context){
        throw new Error("useAnnouncement must be used withing AnnouncementsProvider");
    }

    const announcement = context.announcements.find(channel => channel.id === announcementId);

    if(!announcement){
        console.error("Announcement couldn't be found");
    }

    return announcement;
}

const announcementCompareFn = (a:Announcement, b:Announcement)=> (new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());

/**
 * Provider responsible for exposing announcements context in the app globally.
 * Listens to announcements websocket and updates them
 * Must be used within the `StudentProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function AnnouncementsProvider({children}: {children: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();


    const [announcements, setAnnouncementsRaw] = useState<Announcement[]>([]);

    const {student} = useStudent();

    // To initialize the channels from local storage
    useEffect(()=>{
        getAnnouncements().then((_channels)=> setAnnouncements(_channels));
    }, [])

    useEffect(()=>{
        saveAnnouncements(announcements)
    }, [announcements])

    

    useEffect(()=>{
        
        if(!student) {
            console.log("Student is null");
            return;
        };

      

        subscribe(`/announcements/${student.id}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got announcements`, data);

            if (Array.isArray(data)) {
                const _announcements = data.map((announcement) => announcement as Announcement);
                setAnnouncements(_announcements);
            } else {
                const announcementData = data as Announcement;
                addAnnouncement(announcementData);
            }
        });

        publish(`/scholarly/getAnnouncements/${student.id}`)

    }, [student])
    
    const addAnnouncement = useCallback((announcement: Announcement)=>{
        
        setAnnouncementsRaw((prevAnnouncements)=> distinctList([...prevAnnouncements, announcement], 'id', announcementCompareFn))

    }, [])

    const setAnnouncements = useCallback((_announcements: Announcement[])=>{
        setAnnouncementsRaw(distinctList(_announcements, 'id'))  
    }, [])

    const removeAnnouncement = useCallback((channelId: string)=>{
        const capturedAnnouncements = [...announcements]
        const filtered = capturedAnnouncements.filter(channel => channel.id !== channelId);

        setAnnouncementsRaw(distinctList(filtered, 'id', announcementCompareFn));
    }, [])

    return <AnnouncmentsContext.Provider value={{  announcements, addAnnouncement, setAnnouncements, removeAnnouncement}}>
        {children}
    </AnnouncmentsContext.Provider>
}