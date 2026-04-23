import { useState } from "react"
import forgetPassimage from '../../assets/forget_pass_image.png'
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router"
import ActionLoading from "../../components/Loading/ActionLoading"



export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendOtp = () => {

        if (!email) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/OTP') // navigate to OTP verification page
        }, 2000)

    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F1F8FE]">

            {/* Left Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--primary-color)] p-4 md:p-0">
                <img src={forgetPassimage} alt="Forget Password" className="w-4/5 max-w-lg" />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="" />
                    </div>

                    {/* Card */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-5">

                        <h2 className="text-2xl md:text-3xl text-center font-semibold">Forgot Password?</h2>
                        <p className="text-center text-gray-500 text-base md:text-lg">
                            Enter your email to receive a verification code
                        </p>

                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 rounded-2xl border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] text-base"
                            />

                        </div>

                        {/* Send OTP Button */}
                        <button
                            onClick={sendOtp}
                            disabled={!email}
                            className="w-full bg-[var(--btn-color)] text-white py-3 rounded-2xl hover:bg-opacity-90 transition text-base font-medium flex justify-center items-center mt-4"
                        >
                            {loading ? (<ActionLoading></ActionLoading>) : (
                                "Send OTP"
                            )}
                        </button>

                        {/* Optional Resend / Note */}
                        <p className="text-center text-sm text-gray-400 mt-2">
                            You will receive a code to reset your password.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
