import { Eye, EyeOff, Loader } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { toast } from "sonner"
import appleLogo from '../../assets/apple.png'
import googleLogo from '../../assets/googleLogo.png'
import loginImage from "../../assets/loginImage.png"
import logo from "../../assets/logo.png"
import Error from "../../components/shared/Error"
import type { LoginPayload } from "../../config/auth/auth"
import { loginUser } from "../../redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hook"



export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [load,setLoad] = useState<boolean>(false)


    // hook from for login
    const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>()

    // const { isLoading } = AuthReduxHook()

    // disptach 
    const disptach = useAppDispatch()


    const { isError, errorMessage } = useAppSelector(
        (state) => state.auth
    );

    const loginFn = async (data: LoginPayload) => {
        setLoad(true)
        try {

            const ans = await disptach(
                loginUser({
                    email: data.email,
                    password: data.password,
                    loginAs: "ADMIN",
                })
            );
        
            if(ans.meta.requestStatus == 'rejected'){
                toast.error('Invalid Creadentials')
                return
            }
            toast.success('Login Successfully!')


        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.log(error)
            console.log(isError, errorMessage)
        }
        finally{
            setLoad(false)
        }
    }





    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F1F8FE]">

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-(--primary-color) p-4 md:p-0">
                <img src={loginImage} alt="Login" className="w-4/5 max-w-lg" />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">

                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="" />
                    </div>


                    <form onSubmit={handleSubmit(loginFn)} action="">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-5">


                            <h2 className="text-2xl md:text-3xl text-center font-semibold">Sign In</h2>
                            <p className="text-center text-gray-500 text-base md:text-lg">Welcome Back, Admin 👋</p>


                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    {...register('email', { required: "Email is required" })}
                                    className="w-full font-semibold px-4 py-3 border-2 rounded-2xl border-(--accent-color) focus:outline-none focus:ring-1 focus:ring-(--primary-color) text-base"
                                />
                                {
                                    errors?.email && <Error value={errors?.email?.message}></Error>
                                }

                            </div>


                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password", { required: "Email is required" })}
                                    className="w-full font-semibold px-4 py-3 border-2 rounded-2xl border-(--accent-color) focus:outline-none focus:ring-1 focus:ring-(--primary-color) text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>

                                {
                                    errors?.password && <Error value={errors?.password?.message}></Error>
                                }
                            </div>



                            <button type="submit" className="w-full bg-(--btn-color) cursor-pointer text-white py-3 flex justify-center items-center rounded-2xl hover:bg-opacity-90 transition text-base font-medium">
                                {
                                    load ? <div className="flex justify-center items-center"><Loader className=" animate-spin"></Loader></div> : " Sign In"
                                }
                     
                            </button>


                            <div className="flex items-center ">
                                <div className="grow h-px bg-gray-200" />
                                <span className="px-3 text-sm text-gray-400">or continue with</span>
                                <div className="grow h-px bg-gray-200" />
                            </div>


                            <div className="flex gap-4">
                                <button className="flex-1 flex justify-center items-center gap-2 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition">
                                    <img src={googleLogo} alt="Google" className="h-5 w-5" />
                                    <span className="text-gray-800 font-medium text-base">Google</span>
                                </button>
                                <button className="flex-1 flex justify-center items-center gap-2 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition">
                                    <img src={appleLogo} alt="Apple" className="h-5 w-5" />
                                    <span className="text-gray-800 font-medium text-base">Apple</span>
                                </button>
                            </div>


                            <div className="text-right">
                                <Link to={'/sendOTP'}>
                                    <button className="text-sm text-(--btn-color) hover:underline">
                                        Forgot password?
                                    </button></Link>
                            </div>

                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}
