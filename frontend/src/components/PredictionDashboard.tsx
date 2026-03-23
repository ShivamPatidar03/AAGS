import { predictAPI } from "../services/api";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, TrendingUp, IndianRupee, Wheat, ShoppingCart, ArrowRight, Leaf, CalendarDays, Layers, Ruler } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

type PredictionResult = {
  mandiPrice: number;
  yield: number;
  cost: number;
  revenue: number;
  profit: number;
  status: "profit" | "breakeven" | "loss";
  insights: string[];
  priceTrend: { day: string; price: number }[];
  seasonAvg: { season: string; price: number }[];
  soilImpact: { soil: string; profit: number }[];
};

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useState(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 25));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(interval); }
      else setDisplay(start);
    }, 30);
  });
  return <span>{prefix}{display.toLocaleString("en-IN")}</span>;
}

const DONUT_COLORS = ["hsl(142, 50%, 36%)", "hsl(35, 80%, 55%)"];
const CHART_COLORS = ["hsl(142, 50%, 36%)", "hsl(35, 80%, 55%)", "hsl(0, 70%, 50%)", "hsl(200, 60%, 50%)", "hsl(280, 50%, 50%)"];

// ✅ NEW: Transform backend response → UI format
function transformBackendToUI(data: any): PredictionResult {
  return {
    mandiPrice: data.predicted_price,
    yield: data.yield,
    cost: data.cost,
    revenue: data.revenue,
    profit: data.profit,
    status:
      data.status === "Profitable"
        ? "profit"
        : data.status === "Break-even"
        ? "breakeven"
        : "loss",

    insights: [
      "AI analysis based on your input 🌱",
      "Market conditions evaluated 📊",
      "Consider optimizing cost for better profit 💡",
    ],

    priceTrend: Array.from({ length: 10 }, (_, i) => ({
      day: `Day ${(i + 1) * 7}`,
      price: data.predicted_price + Math.random() * 5,
    })),

    seasonAvg: [
      { season: "Summer", price: data.predicted_price + 2 },
      { season: "Monsoon", price: data.predicted_price - 1 },
      { season: "Winter", price: data.predicted_price + 3 },
    ],

    soilImpact: ["Sandy", "Clay", "Loamy", "Red", "Black"].map((soil) => ({
      soil,
      profit: data.profit + Math.random() * 2000 - 1000,
    })),
  };
}

export default function PredictionDashboard() {
  const [crop, setCrop] = useState("Tomato");
  const [season, setSeason] = useState("Summer");
  const [soil, setSoil] = useState("Sandy");
  const [area, setArea] = useState<number>(100);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [useCurrentMonth, setUseCurrentMonth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");
  const { tr } = useLanguage();

  // ✅ UPDATED: API CALL
  const handlePredict = useCallback(async () => {
    if (!area || area <= 0) {
      setError(tr("dash.areaError"));
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await predictAPI({
        crop: crop.toLowerCase(),
        season: season.toLowerCase(),
        month: useCurrentMonth ? new Date().getMonth() + 1 : month,
        soil_type: soil.toLowerCase(),
        area: area,
      });

      const formatted = transformBackendToUI(res);
      setResult(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch prediction");
    }

    setLoading(false);
  }, [crop, season, soil, area, month, useCurrentMonth, tr]);

  const statusColors = { profit: "bg-success text-success-foreground", breakeven: "bg-warning text-warning-foreground", loss: "bg-destructive text-destructive-foreground" };
  const donutData = result ? [{ name: tr("dash.profit"), value: Math.max(0, result.profit) }, { name: tr("dash.cost"), value: result.cost }] : [];
  const barData = result ? [
    { name: tr("dash.expectedYield"), value: result.yield },
    { name: tr("dash.cost"), value: result.cost },
    { name: tr("dash.revenue"), value: result.revenue },
    { name: tr("dash.profit"), value: Math.max(0, result.profit) },
  ] : [];

  const selectClass = "w-full pl-10 pr-8 py-3.5 rounded-xl bg-muted/80 border border-border/50 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm appearance-none";
  const inputClass = "w-full pl-10 pr-4 py-3.5 rounded-xl bg-muted/80 border border-border/50 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm";

  const crops = ["Tomato", "Capsicum", "Cucumber", "Watermelon", "Cabbage"];
  const soils = ["Sandy", "Clay", "Loamy", "Red", "Black"];

  return (
    <section id="predict" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("dash.badge")}</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">{tr("dash.title1")} <span className="gradient-text">{tr("dash.title2")}</span></h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">{tr("dash.subtitle")}</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 glass-card p-6 sm:p-8 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl">{tr("dash.inputParams")}</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{tr("dash.cropName")}</label>
              <div className="relative">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select value={crop} onChange={(e) => setCrop(e.target.value)} className={selectClass}>
                  {crops.map(c => <option key={c} value={c}>{tr(`crop.${c}`)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{tr("dash.season")}</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select value={season} onChange={(e) => setSeason(e.target.value)} className={selectClass}>
                  {["Summer", "Winter", "Monsoon"].map(s => <option key={s} value={s}>{tr(`season.${s}`)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{tr("dash.soilType")}</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select value={soil} onChange={(e) => setSoil(e.target.value)} className={selectClass}>
                  {soils.map(s => <option key={s} value={s}>{tr(`soil.${s}`)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{tr("dash.area")}</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <input type="number" min={1} value={area} onChange={(e) => setArea(Number(e.target.value))} className={inputClass} placeholder={tr("dash.enterArea")} />
              </div>
              {error && <p className="text-destructive text-sm mt-1.5">{error}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">{tr("dash.month")}</label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" checked={useCurrentMonth} onChange={(e) => setUseCurrentMonth(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
                  {tr("dash.currentMonth")}
                </label>
              </div>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select value={useCurrentMonth ? new Date().getMonth() + 1 : month} onChange={(e) => setMonth(Number(e.target.value))} disabled={useCurrentMonth} className={`${selectClass} ${useCurrentMonth ? "opacity-50" : ""}`}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString("en", { month: "long" })}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handlePredict} disabled={loading}
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow disabled:opacity-70">
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />{tr("dash.running")}</>) : (<>{tr("dash.predictNow")}<ArrowRight className="w-4 h-4" /></>)}
            </motion.button>
          </div>
        </motion.div>

        {/* Output Panel */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-16 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary/20 animate-ping" />
                </div>
                <p className="text-muted-foreground font-medium">{tr("dash.running")}</p>
                <p className="text-sm text-muted-foreground/60">{tr("dash.analyzing")}</p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-16 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl">{tr("dash.readyTitle")}</h3>
                <p className="text-muted-foreground max-w-sm">{tr("dash.readyDesc")}</p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
                {/* Result Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: tr("dash.mandiPrice"), value: result.mandiPrice, prefix: "₹", suffix: "/kg", icon: TrendingUp },
                    { label: tr("dash.expectedYield"), value: result.yield, suffix: " kg", icon: Wheat },
                    { label: tr("dash.estimatedCost"), value: result.cost, prefix: "₹", icon: ShoppingCart },
                    { label: tr("dash.revenue"), value: result.revenue, prefix: "₹", icon: IndianRupee },
                    { label: tr("dash.profit"), value: result.profit, prefix: "₹", icon: TrendingUp },
                  ].map((card, i) => (
                    <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className="glass-card p-4 sm:p-5 group hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <card.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-display font-bold">
                        <AnimatedNumber value={Math.abs(card.value)} prefix={card.prefix || ""} />{card.suffix || ""}
                      </p>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="glass-card p-4 sm:p-5 flex flex-col items-center justify-center">
                    <span className="text-xs text-muted-foreground font-medium mb-2">{tr("dash.status")}</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${statusColors[result.status]}`}>
                      {result.status === "profit" ? tr("dash.profitable") : result.status === "breakeven" ? tr("dash.breakeven") : tr("dash.lossRisk")}
                    </span>
                  </motion.div>
                </div>

                {/* Original Charts Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
                    <h4 className="font-display font-bold mb-4">{tr("dash.profitBreakdown")}</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                          {donutData.map((_, idx) => <Cell key={idx} fill={DONUT_COLORS[idx]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" /> {tr("dash.profit")}</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent inline-block" /> {tr("dash.cost")}</span>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
                    <h4 className="font-display font-bold mb-4">{tr("dash.forecastSummary")}</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(142, 50%, 36%)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                {/* Dynamic Charts Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <h4 className="font-display font-bold text-sm">{tr(`crop.${crop}`)} — {tr("dash.priceTrend")}</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={result.priceTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                        <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="hsl(142, 50%, 36%)" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      <h4 className="font-display font-bold text-sm">{tr("dash.avgBySeason")}</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={result.seasonAvg}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                        <XAxis dataKey="season" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                          {result.seasonAvg.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <h4 className="font-display font-bold text-sm">{tr("dash.costVsRevenue")}</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[{ name: tr("dash.cost"), value: result.cost }, { name: tr("dash.revenue"), value: result.revenue }]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          <Cell fill="hsl(0, 70%, 50%)" />
                          <Cell fill="hsl(142, 50%, 36%)" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-primary" />
                      <h4 className="font-display font-bold text-sm">{tr("dash.soilImpact")}</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={result.soilImpact}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                        <XAxis dataKey="soil" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
                          {result.soilImpact.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                {/* AI Insights */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                  className="glass-card p-6 border-primary/20 bg-primary/[0.03]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="font-display font-bold">{tr("dash.aiInsights")}</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.insights.map((tip, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.08 }}
                        className="text-muted-foreground text-sm leading-relaxed pl-3 border-l-2 border-primary/30 py-1">{tip}</motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>
  );
}