import { Admin } from "./Admin";

export interface Student{
    id:string,
    firstName:string,
    lastName:string,
    fullName:string,
    profile?:string,
    email:string,
    color: string,
    phoneNumber:string,
    createdAt:string,
    counselor: string | Admin
}