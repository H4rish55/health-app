import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const { verifyEmail, user } = useAuthStore()

  const isFormValid = () => {
    return code.every((digit) => digit !== "");
  };

  const handleChange = (index, value) => {
    const newCode = [...code];

    //Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit != "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeydown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedCode = pastedData.slice(0, 6).split("");
    const newCode = [...code];

    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedCode[i] || "";
    }
    setCode(newCode);

    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    inputRefs.current[focusIndex].focus();
  };

  const routeAfterAuth = (navigation, users) => {
    if(!users?.isVerified){
      navigate("/verify-email", { replace: true })
      return
    }
    navigate(users?.role === "doctor" ? "/doctor": "/", { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!isFormValid) return
    const verificationCode = code.join("")

    try {
        const result = await verifyEmail(verificationCode)

        if(result && result.success !== false){
            const { user: freshUser } = useAuthStore.getState()
            routeAfterAuth(navigate, freshUser ?? user)
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
  }

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Verify Your Email
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
              Enter the 6-digit code sent to your email address
            </p>
          </div>

          {/* Verification Form */}
          <form className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl" >
            <div className="space-y-8">
              {/* Code Input Boxes */}
              <div className="flex justify-center gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white text-xl font-semibold outline-none transition-all duration-300 focus:bg-white/8 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 focus:scale-110"
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeydown(index, e)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Code expires in{" "}
                  <span className="text-indigo-400 font-semibold">04:59</span>
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                disabled={!isFormValid() || isSubmitting}
                onClick={handleSubmit}
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
                  {submitStatus === "loading" ? (
                    "Verifying..."
                  ) : submitStatus === "success" ? (
                    "Email Verified!"
                  ) : (
                    <>
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {submitStatus === "idle" && "Verify Email"}
                    </>
                  )}
                </span>
              </button>

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium underline decoration-indigo-400/30 hover:decoration-indigo-300"
                >
                  Resend Code
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/70 text-gray-400">
                    Need help?
                  </span>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  to={'/signup'}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-lg"
                >
                  ← Back to SignUp
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
