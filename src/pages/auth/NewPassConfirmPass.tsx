import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import newPassConfirmPassImage from '../../assets/password_image_newPassimage.png'
import logo from "../../assets/logo.png"
import ActionLoading from "../../components/Loading/ActionLoading"

type FormData = {
  password: string
  confirmPassword: string
}

export default function NewPassConfirmPass() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const passwordValue = watch("password")

  const onSubmit = (data: FormData) => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate("/") // success redirect
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F1F8FE]">

      {/* Left Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--primary-color)] p-4 md:p-0">
        <img src={newPassConfirmPassImage} alt="Reset Password" className="w-4/5 max-w-lg" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" />
          </div>

          {/* Card */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-5"
          >
            <h2 className="text-2xl md:text-3xl text-center font-semibold">
              Set New Password
            </h2>
            <p className="text-center text-gray-500 text-base md:text-lg">
              Create a strong new password 🔐
            </p>

            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]
                ${errors.password ? "border-red-500" : "border-[var(--accent-color)]"}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]
                ${errors.confirmPassword ? "border-red-500" : "border-[var(--accent-color)]"}`}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[var(--btn-color)] text-white py-3 rounded-2xl flex justify-center items-center hover:bg-opacity-90 transition text-base font-medium"
            >
              {loading ? <ActionLoading /> : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
