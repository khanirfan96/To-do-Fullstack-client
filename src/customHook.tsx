import axios from 'axios';
import { LOGIN_URL } from './utils/api_url';

export const useLogin = async(email:string, password:string) =>{
    try{
        const loginResponse = await axios.post(LOGIN_URL , {
            email:email,
            password:password
        })
        return loginResponse;
    }catch(error){
        console.log(error, 'errror');
        return error;
    }
}
