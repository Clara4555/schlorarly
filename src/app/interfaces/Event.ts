import { ReactNode } from "react";
import { Member } from "./Member";

export interface Event {
    id: string;
    eventTitle: string;
    eventDescription: string;
    audience: Member[];  // I suggest using Member[] instead of string[], unless you have a specific reason for using string[]
    keyInformation?: string[];
    eventPhoto?: string;
    createdTime: string;
    designatedTime: string;
}
