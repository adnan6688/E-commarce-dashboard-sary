import { createAxiosSecure } from "../../../axios/axiosSequre"
import type {IBanner} from './banner.type'




export const bannerGetApi = async ({ token } : IBanner ) => {
    const axiosSequre = createAxiosSecure(token)

    try {
        const res = await axiosSequre.get(`users/get-banners`)
        return res.data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        console.log(error)
    }


}