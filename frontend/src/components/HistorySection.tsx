import { motion } from "framer-motion";
import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const historyData = [
  { id: 1, date: "2026-02-28", crop: "Tomato", season: "Winter", area: 200, profit: 12400, status: "profit" as const },
  { id: 2, date: "2026-02-15", crop: "Capsicum", season: "Winter", area: 150, profit: 8900, status: "profit" as const },
  { id: 3, date: "2026-01-20", crop: "Cucumber", season: "Monsoon", area: 100, profit: -1200, status: "loss" as const },
  { id: 4, date: "2026-01-05", crop: "Watermelon", season: "Summer", area: 300, profit: 450, status: "breakeven" as const },
  { id: 5, date: "2025-12-18", crop: "Cabbage", season: "Winter", area: 250, profit: 15600, status: "profit" as const },
];

const statusBadge = {
  profit: "bg-success/10 text-success",
  breakeven: "bg-warning/10 text-warning",
  loss: "bg-destructive/10 text-destructive",
};

export default function HistorySection() {
  const [filterCrop, setFilterCrop] = useState("All");
  const [search, setSearch] = useState("");
  const { tr } = useLanguage();

  const filtered = historyData.filter((row) => {
    if (filterCrop !== "All" && row.crop !== filterCrop) return false;
    if (search && !row.crop.toLowerCase().includes(search.toLowerCase()) && !row.season.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("hist.badge")}</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">{tr("hist.title1")} <span className="gradient-text">{tr("hist.title2")}</span></h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-border/50">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder={tr("hist.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-muted/80 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-44"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select value={filterCrop} onChange={(e) => setFilterCrop(e.target.value)}
                  className="pl-10 pr-6 py-2.5 rounded-xl bg-muted/80 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                  <option value="All">{tr("hist.all")}</option>
                  {["Tomato", "Capsicum", "Cucumber", "Watermelon", "Cabbage"].map(c => (
                    <option key={c} value={c}>{tr(`crop.${c}`)}</option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors">
              <Download className="w-4 h-4" /> {tr("hist.export")}
            </motion.button>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden p-4 space-y-3">
            {filtered.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No predictions found</p>}
            {filtered.map((row) => (
              <div key={row.id} className="p-4 rounded-xl bg-muted/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{tr(`crop.${row.crop}`)}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusBadge[row.status]}`}>
                    {row.status === "profit" ? tr("dash.profitable") : row.status === "breakeven" ? tr("dash.breakeven") : tr("dash.lossRisk")}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>{row.date}</span><span>{tr(`season.${row.season}`)} · {row.area} sqm</span>
                </div>
                <div className="text-lg font-display font-bold">
                  ₹{Math.abs(row.profit).toLocaleString("en-IN")}
                  {row.profit < 0 && <span className="text-destructive"> (Loss)</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border/50">
                  <th className="px-6 py-3.5 font-medium">{tr("hist.date")}</th>
                  <th className="px-6 py-3.5 font-medium">{tr("hist.crop")}</th>
                  <th className="px-6 py-3.5 font-medium">{tr("hist.season")}</th>
                  <th className="px-6 py-3.5 font-medium">{tr("hist.area")}</th>
                  <th className="px-6 py-3.5 font-medium">{tr("hist.profit")}</th>
                  <th className="px-6 py-3.5 font-medium">{tr("hist.status")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No predictions found</td></tr>
                )}
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-border/30 hover:bg-primary/[0.03] transition-colors">
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4 font-medium">{tr(`crop.${row.crop}`)}</td>
                    <td className="px-6 py-4">{tr(`season.${row.season}`)}</td>
                    <td className="px-6 py-4">{row.area}</td>
                    <td className="px-6 py-4 font-display font-bold">{row.profit < 0 ? "-" : ""}₹{Math.abs(row.profit).toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge[row.status]}`}>
                        {row.status === "profit" ? tr("dash.profitable") : row.status === "breakeven" ? tr("dash.breakeven") : tr("dash.lossRisk")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
