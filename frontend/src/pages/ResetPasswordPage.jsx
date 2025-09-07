import React, { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { Lock } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, message, isResetPassword, error } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);

      toast.success("Password reset successfull, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      });
    } catch (error) {
      toast.error(error.message || "Error resetting password");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background*/}
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

      {/* Main */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-lg">
          <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Reset Password
            </h2>

            {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
            {message && (
              <p className="text-emerald-400 text-sm mb-4">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                icon={Lock}
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={isResetPassword}
                className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden
                bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900
                ${
                  isResetPassword
                    ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-lg"
                    : ""
                }`}
              >
                {isResetPassword ? "Resetting..." : "Set New Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
