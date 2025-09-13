import { Outlet } from "react-router-dom";
import ModelNav from "../components/ModelNav";

const ModelLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      <div className="mx-auto max-w-4xl p-6">
        <ModelNav /> 
        <Outlet />     
      </div>
    </div>
  );
}

export default ModelLayout