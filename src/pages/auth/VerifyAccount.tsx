import { useState, useRef } from "react"
import verifyImage from '../../assets/rafiki.png'
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router"

export default function VerifyAccount() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    const [loading, setLoading] = useState(false)
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])
    const navigate = useNavigate()

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return // only digits allowed
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // auto focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // move focus back
            inputsRef.current[index - 1]?.focus()
        }
    }

    const verifyFn = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/newPassConPass') // after verification
        }, 2000)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F1F8FE]">

            {/* Left Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--primary-color)] p-4 md:p-0">
                <img src={verifyImage} alt="Verify" className="w-4/5 max-w-lg" />
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

                        <h2 className="text-2xl md:text-3xl text-center font-semibold">Verify Your Account</h2>
                        <p className="text-center text-gray-500 text-base md:text-lg">Enter the 6-digit code sent to your email</p>

                        {/* OTP Inputs */}
                        <div className="flex justify-between gap-2 mt-2">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el: HTMLInputElement | null) => { inputsRef.current[idx] = el }}

                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className="w-12 h-12 text-center text-xl border-2 border-[var(--accent-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                />
                            ))}
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={verifyFn}
                            disabled={otp.includes('')}
                            className="w-full bg-[var(--btn-color)] text-white py-3 rounded-2xl hover:bg-opacity-90 transition text-base font-medium mt-4 flex justify-center items-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : (
                                "Confirm"
                            )}
                        </button>

                        {/* Resend */}
                        <div className="text-center mt-2">
                            <button className="text-sm text-[var(--btn-color)] hover:underline">
                                Resend Code?
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
