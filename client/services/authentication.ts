import { RegisterType } from "@kethireddynithinreddy/workflo-common";
import axios, { AxiosError } from "axios";


export const RegisterService = async ({
    email,
    username,
    password
}: RegisterType) => {
    try {
        const res = await axios.post("http://localhost:8080/api/v1/user/signup", 
            { email, username, password }, 
            {withCredentials: true});
        
        console.log(res.data)
        return res.data;

        

    } catch (error) {
        if(error instanceof AxiosError){
            return error.response?.data;
        } else {
            return { error: "something went wrong"}
        }
    }
}