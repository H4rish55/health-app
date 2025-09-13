import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Footer from "./components/Footer";

//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  if (!user.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }

  console.log(isAuthenticated)
  console.log(user)

  return children;
};

//Redirect authenticated user to HomePage
const RedirectAuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (user?.isVerified && isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
              <HomePage />
          }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/verify-email" element={<EmailVerificationPage />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
