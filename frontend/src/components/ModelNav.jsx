// src/components/ModelNav.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Brain, HeartPulse, Activity } from "lucide-react";
import { motion as Motion } from "framer-motion";

const ITEMS = [
  { to: "/stroke",        label: "Stroke",   icon: <Brain className="h-5 w-5" />,      grad: "from-orange-500 to-rose-600" },
  { to: "/heart-disease", label: "Heart",    icon: <HeartPulse className="h-5 w-5" />,  grad: "from-fuchsia-500 to-purple-600" },
  { to: "/diabetes",      label: "Diabetes", icon: <Activity className="h-5 w-5" />,    grad: "from-sky-500 to-cyan-500" },
];

const ModelNav = ({ items = ITEMS }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav
      role="tablist"
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-1.5 overflow-hidden"
    >
      {/* grid ensures pixel-perfect alignment on small screens */}
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((it) => {
          const active = isActive(it.to);
          return (
            <button
              key={it.to}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => navigate(it.to)}
              className="relative h-11 md:h-12 rounded-xl text-sm md:text-base leading-none
                         flex items-center justify-center gap-2 text-gray-300 font-medium"
            >
              {active && (
                <Motion.div
                  layoutId="modelnav-active"
                  className={`absolute inset-[1px] rounded-[10px] md:rounded-xl bg-gradient-to-r ${it.grad} shadow-md`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                {it.icon}
                <span className="truncate">{it.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ModelNav
