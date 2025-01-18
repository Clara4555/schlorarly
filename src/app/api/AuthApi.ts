import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { axiosInstance, baseUrl } from "./Core";

type StudentBody = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword?: string,
}

export async function loginAccount(emailOrPhoneNumber:string, password:string){
    const reqBody = {password}
    /// To determin whether it's email or phone number
    reqBody[emailOrPhoneNumber.includes('@')? 'email':'phoneNumber'] = emailOrPhoneNumber;

    const response = await axiosInstance.post(`auth/student/login`, reqBody);

    return response as AxiosResponse<ApiResponse, any>;
}

export async function registerAccount(student: StudentBody){
    const reqBody = student

    const response = await axiosInstance.post(`auth/student/register`, reqBody);

    console.log(response.data);

    return response as AxiosResponse<ApiResponse, any>;
}