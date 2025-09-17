import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Activity,
  Brain,
  HeartPulse,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useDoctorStore } from "../../store/doctorStore";
import DoctorNavBar from "../../components/DoctorNavBar";

const modelIcon = (m) => {
  const cls = "w-4 h-4";
  if (m === "stroke") return <Activity className={cls} />;
  if (m === "heart") return <HeartPulse className={cls} />;
  return <Brain className={cls} />;
};

const badgeClasses = (m) =>
  `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${
    m === "heart"
      ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
      : m === "stroke"
      ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
      : "bg-sky-500/10 text-sky-300 border-sky-500/30"
  }`;

const fmtPct = (p) =>
  p == null ? "—" : `${(p <= 1 ? p * 100 : p).toFixed(1)}%`;
const pageSizeOptions = [10, 20, 50];

const normProb = (p) => {
  if (p == null) return 0;
  let x = typeof p === "string" ? p.trim() : p;
  if (typeof x === "string") {
    if (x.endsWith("%")) x = x.slice(0, -1);
    x = parseFloat(x);
  }
  if (Number.isNaN(x)) return 0;

  if (x > 1) x = x / 100;

  return Math.max(0, Math.min(1, x));
};

export default function DoctorPage() {
  const { doctorPage, data, total, limit, page, isDoctor } = useDoctorStore();
  const [model, setModel] = useState("");
  const [sort, setSort] = useState("recent");
  const [rows, setRows] = useState(limit || 20);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    doctorPage({ page: currentPage, limit: rows, model });
  }, [doctorPage, currentPage, rows, model]);

  const visible = useMemo(() => {
  let rowsArr = (data || []).slice();

  if (model) {
    rowsArr = rowsArr.filter(
      (r) => (r.model ?? "").toString().toLowerCase() === model
    );
  }

  rowsArr.sort((a, b) => {
    const pa = normProb(a.probability);
    const pb = normProb(b.probability);

    if (sort === "probHigh") {
      if (pb !== pa) return pb - pa;                       
    } else if (sort === "probLow") {
      if (pb !== pa) return pa - pb;                     
    } else {
      // recent
      const da = new Date(a.createdAt).getTime() || 0;
      const db = new Date(b.createdAt).getTime() || 0;
      if (db !== da) return db - da;                        
    }

    const da = new Date(a.createdAt).getTime() || 0;
    const db = new Date(b.createdAt).getTime() || 0;
    if (db !== da) return db - da;

    const ia = String(a._id || "");
    const ib = String(b._id || "");
    return ib.localeCompare(ia);
  });

  if (!search.trim()) return rowsArr;
  const q = search.toLowerCase();
  return rowsArr.filter((r) =>
    [
      (r.model ?? "").toString().toLowerCase(),
      (r.predictedLabel ?? "").toString().toLowerCase(),
      fmtPct(r.probability).toLowerCase(),
    ].some((x) => x.includes(q))
  );
}, [data, model, sort, search]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / rows));

  const Card = ({ className = "", children }) => (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-xl p-4 ${className}`}
    >
      {children}
    </Motion.div>
  );

  return (
    <>
      <DoctorNavBar />
      <div className="min-h-screen text-white relative pt-18">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 15% 85%, rgba(129, 140, 248, 0.28), transparent 45%),
               radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.18), transparent 45%),
               radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.16), transparent 40%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:py-10">
          <Motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Doctor Dashboard
              </h1>
              <p className="text-white/60 mt-1">
                Recent patient predictions & analytics
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="uppercase tracking-wider border border-white/10 rounded px-2 py-1 text-white/70">
                secure
              </span>
              <span className="uppercase tracking-wider border border-white/10 rounded px-2 py-1 text-white/70">
                role: doctor
              </span>
            </div>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <Card className="md:col-span-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    value={search}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSearch(v);
                      if (debounceRef.current)
                        clearTimeout(debounceRef.current);
                      debounceRef.current = setTimeout(() => {}, 250);
                    }}
                    placeholder="Search by model, label, probability…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() =>
                    doctorPage({ page: currentPage, limit: rows, sort, model })
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-indigo-500 hover:bg-white/10 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </Card>

            <Card className="md:col-span-6">
              <div className="grid grid-cols-6 gap-3 items-end">
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-xs text-white/60 mb-1">
                    Model
                  </label>
                  <select
                    value={model}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setModel(e.target.value);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500"
                  >
                    <option value="">All</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="heart">Heart</option>
                    <option value="stroke">Stroke</option>
                  </select>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-xs text-white/60 mb-1">
                    Sort
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setSort(e.target.value);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="probHigh">Probability High → Low</option>
                    <option value="probLow">Probability Low → High</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-xs text-white/60 mb-1">
                    Rows
                  </label>
                  <select
                    value={rows}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setRows(Number(e.target.value));
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500"
                  >
                    {pageSizeOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs text-white/60 border-b border-white/10">
              <div className="col-span-3">Patient / Record</div>
              <div className="col-span-2">Model</div>
              <div className="col-span-3">Predicted Label</div>
              <div className="col-span-2">Probability</div>
              <div className="col-span-2 text-right">Created</div>
            </div>

            {isDoctor ? (
              <div className="p-8 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading records…
              </div>
            ) : visible.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-white/70">No records found.</div>
              </div>
            ) : (
              <div key={`${model}-${sort}-${currentPage}`} className="divide-y divide-white/5">
                {visible.map((r) => (
                  <div
                    key={r._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4"
                  >
                    <div className="md:col-span-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {modelIcon(r.model)}
                      </div>
                      <div>
                        <div className="font-medium">
                          Record #{String(r._id).slice(-6)}
                        </div>
                        <div className="text-xs text-white/60">
                          ID: {String(r._id).slice(0, 6)}…
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center">
                      <span className={badgeClasses(r.model)}>
                        {modelIcon(r.model)}{" "}
                        <span className="capitalize">{r.model}</span>
                      </span>
                    </div>

                    <div className="md:col-span-3 flex items-center">
                      <span className="text-sm font-medium capitalize">
                        {r.predictedLabel ?? "—"}
                      </span>
                    </div>

                    <div className="md:col-span-2 flex items-center">
                      <div className="w-full max-w-[200px]">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-400"
                            style={{
                              width: `${Math.min(
                                100,
                                normProb(r.probability) * 100
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-white/70 mt-1">
                          {fmtPct(r.probability)}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center md:justify-end text-sm text-white/80">
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-white/60 text-sm">
              Page {currentPage} of {totalPages} · {total} total
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 disabled:opacity-40 hover:border-indigo-500 hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 disabled:opacity-40 hover:border-indigo-500 hover:bg-white/10"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/70">
            <div className="flex items-center gap-2">
              {modelIcon("diabetes")} Diabetes predictions
            </div>
            <div className="flex items-center gap-2">
              {modelIcon("heart")} Heart disease predictions
            </div>
            <div className="flex items-center gap-2">
              {modelIcon("stroke")} Stroke predictions
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
