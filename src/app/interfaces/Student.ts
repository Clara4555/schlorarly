import { Admin } from "./Admin";

export interface Student{
    id:string,
    firstName:string,
    lastName:string,
    fullName:string,
    profile?:string,
    password?:string,
    email:string,
    color: string,
    phoneNumber:string,
    createdAt:string,
    counselor: string | Admin
}