// axiosSecure.ts
import axios from "axios"
const URL = import.meta.env.VITE_BASE_URL


export const createAxiosSecure = (token: string | null = null) => {

    
    const instance = axios.create({
        baseURL: URL,
        headers: {
            "Content-Type": "application/json",
        },
    })
    // REQUEST INTERCEPTOR
      instance.interceptors.request.use(
        (config) => {
          if ( !!token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )

    // RESPONSE INTERCEPTOR
    //   instance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //       const originalRequest = error.config
    //       // token expired → 401
    //       if (error?.response?.data?.message == "jwt expired") {

    //         const res = await axios.post(`${baseURL}auth/refresh`, { refreshToken: user?.refreshToken })

    //         const newToken = res?.data?.data?.newAccessToken
    //         const refreshToken = res?.data?.data?.newRefreshToken

    //         diptach(setTokens({ accessToken: newToken, refreshToken }))
    //         originalRequest.headers.Authorization = `${newToken}`

    //       }

    //       return Promise.reject(error)
    //     }
    //   )

    return instance
}
