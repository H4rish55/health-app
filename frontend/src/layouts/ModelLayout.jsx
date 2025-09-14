import { Outlet } from "react-router-dom";
import ModelNav from "../components/ModelNav";
import ChatbotPage from "../pages/ChatbotPage";
import NavBarLogout from "../components/NavBarLogout";

const ModelLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
        <NavBarLogout />
      <div className="mx-auto max-w-4xl p-6 pt-16 sm:pt-20">
        <ModelNav /> 
        <Outlet />     
      </div>

      <ChatbotPage />
    </div>
  );
}

export default ModelLayout