import { createAxiosSecure } from "../../../axios/axiosSequre"
import AuthReduxHook from "../../../Hook/AuthReduxHook"


export const recentOderApi = async ()=>{
        const {token} = AuthReduxHook()
        const axiosSequre = createAxiosSecure(token)
    try{
        const res = await axiosSequre.get(`admin/recent-orders`)
        console.log("res")
        return res

    }
    catch(error : any){
        console.log(error)
    }
}