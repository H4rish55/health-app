import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { Toaster } from "react-hot-toast"
import EmailVerificationPage from "./pages/EmailVerificationPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
