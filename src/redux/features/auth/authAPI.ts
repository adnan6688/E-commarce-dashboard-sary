import axios from "axios";
import type { LoginPayload, TUser } from "../../../config/auth/auth";


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


export const LoginUserApi = async (data: LoginPayload): Promise<TUser> => {

    const response = await api.post(`auth/login`,  data );
    const result = response?.data?.data;
    return result;
};
