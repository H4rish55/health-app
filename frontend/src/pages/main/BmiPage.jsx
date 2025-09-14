// src/pages/BmiPage.jsx
import React, { useMemo, useState } from "react";
import { Loader2, Weight, Ruler, Activity } from "lucide-react";
import { useBmiStore } from "../../store/bmiStore";
import ModelLayout from "../../layouts/ModelLayout";
import NavBarLogout from "../../components/NavBarLogout";

function classifyBMI(b) {
  if (b == null || Number.isNaN(b)) return { label: "-", color: "bg-white/20", tone: "text-white/80" };
  if (b < 18.5) return { label: "Underweight", color: "bg-sky-400/30", tone: "text-sky-300" };
  if (b < 25) return { label: "Normal", color: "bg-emerald-400/30", tone: "text-emerald-300" };
  if (b < 30) return { label: "Overweight", color: "bg-amber-400/30", tone: "text-amber-300" };
  return { label: "Obesity", color: "bg-rose-400/30", tone: "text-rose-300" };
}

export default function BmiPage() {
  const { bmikg, bmipound, bmiInKgs, bmiInPounds, data } = useBmiStore((s) => s);

  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const isLoading = unit === "metric" ? bmiInKgs : bmiInPounds;
  const bmi = useMemo(() => (data?.bmi ? parseFloat(data.bmi) : null), [data]);
  const cls = classifyBMI(bmi ?? NaN);

  const onSubmit = async (e) => {
    e.preventDefault();
    const w = Number(weight);
    const h = Number(height);
    if (!w || !h || w <= 0 || h <= 0) return;

    if (unit === "metric") {
      const meters = h / 100; 
      await bmikg({ weight: w, height: meters });
    } else {
      await bmipound({ weight: w, height: h }); 
    }
  };

  return (
    <>
    <NavBarLogout />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white py-16 pt-23">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">BMI Calculator</h1>
          <p className="text-white/70 text-base md:text-lg mt-2">Calculate your Body Mass Index.</p>
        </header>

        <div className="inline-flex mb-8 p-1.5 rounded-2xl border border-white/10 bg-white/5">
          {[
            { key: "metric", label: "Metric (kg/cm)" },
            { key: "imperial", label: "Imperial (lb/in)" },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setUnit(opt.key)}
              className={`px-4 md:px-5 py-2.5 rounded-xl text-sm md:text-base font-medium transition ${
                unit === opt.key
                  ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white/80"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Weight */}
              <div>
                <label className="text-sm md:text-base text-white/70">
                  Weight ({unit === "metric" ? "kg" : "lb"})
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                  <Weight className="h-5 w-5 text-white/70" />
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-transparent py-3.5 outline-none text-white placeholder:text-white/40 text-base"
                    placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                  />
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="text-sm md:text-base text-white/70">
                  Height ({unit === "metric" ? "cm" : "in"})
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                  <Ruler className="h-5 w-5 text-white/70" />
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-transparent py-3.5 outline-none text-white placeholder:text-white/40 text-base"
                    placeholder={unit === "metric" ? "e.g. 175" : "e.g. 69"}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 px-6 md:px-7 py-3 md:py-3.5 text-base font-semibold text-white/80 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Calculating…
                  </>
                ) : (
                  <>
                    <Activity className="h-5 w-5" />
                    Calculate BMI
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm md:text-base text-white/70">Result</p>
              <div className="mt-3 md:mt-4 flex items-end gap-4">
                <span className="text-5xl md:text-6xl font-semibold tracking-tight">{bmi ?? "--"}</span>
                <span className={`text-sm md:text-base px-2.5 py-1.5 rounded-md border border-white/10 ${cls.color} ${cls.tone}`}>
                  {cls.label}
                </span>
              </div>
              <p className="mt-3 text-white/70 text-sm md:text-base">
                {bmi == null ? "Fill the form and click Calculate." : "This is an estimate based on your inputs."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
              {[
                { label: "Under", range: "<18.5", tone: "bg-sky-400/30" },
                { label: "Normal", range: "18.5–24.9", tone: "bg-emerald-400/30" },
                { label: "Over", range: "25–29.9", tone: "bg-amber-400/30" },
                { label: "Obese", range: "30+", tone: "bg-rose-400/30" },
              ].map((seg, i) => (
                <div
                  key={i}
                  className={`rounded-xl border border-white/10 ${seg.tone} p-3 md:p-4
                              flex flex-col items-center justify-center text-center
                              min-h-[88px] md:min-h-[96px]`}
                >
                  <p className="font-medium leading-tight">{seg.label}</p>
                  <p className="text-white/80 mt-1 leading-tight">{seg.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}