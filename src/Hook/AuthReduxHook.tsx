import { useAppSelector } from "../redux/hook";


export default function AuthReduxHook() {


    const { user, isLoading, isError, errorMessage } = useAppSelector((state) => state.auth)


    const authUser = user?.user
    const token = user?.accessToken

    
    return { authUser, token, isLoading, isError, errorMessage }
}