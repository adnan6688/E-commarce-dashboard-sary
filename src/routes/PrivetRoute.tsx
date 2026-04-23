import  { type ReactNode } from 'react'
import AuthReduxHook from '../Hook/AuthReduxHook'
import { Navigate } from 'react-router'



export default function PrivetRoute({ children }: { children: ReactNode }) {

    // get user from redux
    const { authUser } = AuthReduxHook()


    // ck user is exits
    if (authUser) {
        return children
    }

    return (
        <div> <Navigate to={'/'}></Navigate> </div>
    )
}
