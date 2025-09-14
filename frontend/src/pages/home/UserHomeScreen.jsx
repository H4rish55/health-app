import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Brain, Activity, HeartPulse, Calculator } from "lucide-react";
import NavBarLogout from "../../components/NavBarLogout";
import ChatbotPage from "../ChatbotPage";

const UserHomeScreen = () => {
  return (
    <>
    <NavBarLogout />
      <div className="relative min-h-screen bg-[#0b1220] text-slate-100 overflow-hidden">
      <Motion.div
        className="pointer-events-none absolute -top-40 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl bg-gradient-to-br from-fuchsia-600/20 to-purple-500/20"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="pointer-events-none absolute -bottom-44 -right-28 h-[44rem] w-[44rem] rounded-full blur-3xl bg-gradient-to-br from-sky-500/20 to-cyan-400/20"
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(900px 450px at 15% 10%, rgba(168,85,247,0.12), transparent 70%)," +
            "radial-gradient(800px 380px at 85% 20%, rgba(56,189,248,0.10), transparent 70%)," +
            "radial-gradient(1100px 650px at 50% 120%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-22 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Get Started
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/70 max-w-5xl mx-auto">
            Choose a model to begin your guided health assessment—fast, simple,
            and tailored to you.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            <ModelCard
              to="/stroke"
              title="Stroke Prediction"
              desc="Start a quick stroke risk assessment."
              Icon={Brain}
              gradient="from-red-500 to-orange-500"
              score="94%"
            />
            <ModelCard
              to="/heart-disease"
              title="Heart Disease Detection"
              desc="Run a fast heart-health assessment."
              Icon={HeartPulse}
              gradient="from-purple-500 to-pink-500"
              score="96%"
            />
            <ModelCard
              to="/diabetes"
              title="Diabetes Prediction"
              desc="Begin your diabetes risk check with key inputs."
              Icon={Activity}
              gradient="from-blue-500 to-cyan-500"
              score="91%"
            />
          </div>
        </section>

        <BMIQuick />
      </main>
    </div>
    </>
    
  );
};

// eslint-disable-next-line no-unused-vars
function ModelCard({ to, title, desc, Icon, gradient, score }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="h-full"
    >
      <Link
        to={to}
        className="group relative block h-full rounded-3xl border border-white/15 bg-[#0f1629]/80 hover:bg-[#121b32]/80 backdrop-blur-xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden"
        aria-label={title}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <span
              className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tabular-nums w-16 text-right`}
            >
              {score}
            </span>
          </div>

          <h3 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight">
            {title}
          </h3>

          <p className="mt-3 text-base sm:text-lg text-white/80 leading-relaxed min-h-[3.75rem]">
            {desc}
          </p>

          <div className="mt-6">
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                style={{ width: score }}
              />
            </div>
          </div>

          <div className="mt-auto pt-6 inline-flex items-center gap-2 text-base font-semibold">
            Start{" "}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </Motion.div>
  );
}

const BMIQuick = () => {
  const [bmi, setBmi] = useState(24);
  const { label, grad, pct } = useMemo(() => {
    const v = Number(bmi) || 0;
    let label = "";
    let grad = "from-sky-400 to-cyan-500";
    if (v > 0 && v < 18.5) {
      label = "Underweight";
      grad = "from-sky-400 to-cyan-500";
    } else if (v >= 18.5 && v < 25) {
      label = "Normal";
      grad = "from-emerald-400 to-green-500";
    } else if (v >= 25 && v < 30) {
      label = "Overweight";
      grad = "from-amber-400 to-orange-500";
    } else if (v >= 30) {
      label = "Obese";
      grad = "from-rose-500 to-fuchsia-500";
    }
    const clamped = Math.min(40, Math.max(15, v));
    const pct = ((clamped - 15) / (40 - 15)) * 100;
    return { label, grad, pct };
  }, [bmi]);

  return (
    <section className="max-w-4xl mx-auto w-full">
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="rounded-3xl border border-white/15 bg-[#0f1629]/80 hover:bg-[#121b32]/80 backdrop-blur-xl p-7 lg:p-8 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-white/10">
              <Calculator className="w-6 h-6" />
            </span>
            <h4 className="text-xl font-semibold">BMI quick check</h4>
          </div>
          {label && (
            <span
              className={`text-sm px-3 py-1.5 rounded-full bg-gradient-to-r ${grad} text-slate-900 font-semibold`}
            >
              {label}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.1"
              min="10"
              max="60"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              className="w-40 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/40 text-base"
            />
            <span className="text-sm text-white/70">Enter your BMI</span>
          </div>
          <input
            type="range"
            min={15}
            max={40}
            step={0.1}
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            className="sm:flex-1 w-full"
          />
        </div>

        <div className="mt-5 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${grad}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-white/40 mt-1.5">
          <span>15</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>
      </Motion.div>
      <ChatbotPage />
    </section>
  );
};

export default UserHomeScreen;
