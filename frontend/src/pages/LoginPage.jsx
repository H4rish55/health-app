import { useState } from "react";
import EyeIcon from "../components/EyeIcon";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";

const VitalIQLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, loading, success

  const { login } = useAuthStore()

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return email && password && role
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isFormValid) return

    setIsSubmitting(true)
    setSubmitStatus("loading")

    try {
      const result = await login({ email, password, role })

      if(result && result.success !== false){
        setSubmitStatus("success")
      } else {
        setSubmitStatus("idle")
      }
    } catch (error) {
      setSubmitStatus("idle")
      console.log(error.message)
    } finally {
      setIsSubmitting(false)
    }

  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.15), transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-lg">
          {/* Header Section */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                VitalIQ
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
              Sign in to access your intelligent healthcare dashboard
            </p>
          </div>

          {/* Login Form */}
          <form className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none text-lg transition-all duration-300 focus:bg-white/8 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 focus:-translate-y-0.5"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none text-lg transition-all duration-300 focus:bg-white/8 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 focus:-translate-y-0.5"
                    placeholder="Enter your password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Login As
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Doctor Role */}
                  <div
                    className={`bg-white/3 border rounded-xl p-6 cursor-pointer text-center transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:border-white/20 ${
                      role === "doctor"
                        ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500 scale-105"
                        : "border-white/10"
                    }`}
                    onClick={() => setRole("doctor")}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Doctor
                    </h3>
                    <p className="text-sm text-gray-400">
                      Healthcare professional dashboard
                    </p>
                  </div>

                  {/* Patient Role */}
                  <div
                    className={`bg-white/3 border rounded-xl p-6 cursor-pointer text-center transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:border-white/20 ${
                      role === "patient"
                        ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500 scale-105"
                        : "border-white/10"
                    }`}
                    onClick={() => setRole("patient")}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Patient
                    </h3>
                    <p className="text-sm text-gray-400">
                      Personal health portal
                    </p>
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to={'/forgot-password'}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden ${
                  submitStatus === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
                } ${!isFormValid() || isSubmitting ? "opacity-50" : ""}`}
              >
                <span className="relative z-10">
                  {submitStatus === "loading" && (
                    <svg
                      className="w-5 h-5 animate-spin inline-block mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                  {submitStatus === "success" && (
                    <svg
                      className="w-5 h-5 inline-block mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {submitStatus === "loading"
                    ? "Signing In..."
                    : submitStatus === "success"
                    ? "Welcome Back!"
                    : "Sign In"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/70 text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <Link
                to={"/signup"}
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-lg"
              >
                Create your VitalIQ account →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VitalIQLogin;
