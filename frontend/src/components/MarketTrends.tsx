import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, BarChart3, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/api";

export default function MarketTrends() {
  const { tr } = useLanguage();

  const [priceTrendData, setPriceTrendData] = useState([]);
  const [demandData, setDemandData] = useState([]);
  const [cropCompare, setCropCompare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setPriceTrendData(data.price_trend);
        setDemandData(data.seasonal_demand);
        setCropCompare(data.crop_comparison);
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="market-trends" className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {tr("mt.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {tr("mt.title1")} <span className="gradient-text">{tr("mt.title2")}</span>
          </h2>
        </motion.div>

        {/* PRICE TREND */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <motion.div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h4 className="font-display font-bold">{tr("mt.priceTrend")}</h4>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line dataKey="Tomato" stroke="red" />
                <Line dataKey="Capsicum" stroke="orange" />
                <Line dataKey="Cucumber" stroke="green" />
                <Line dataKey="Watermelon" stroke="teal" />
                <Line dataKey="Cabbage" stroke="blue" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* DEMAND */}
          <motion.div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h4>{tr("mt.seasonalDemand")}</h4>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="green" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

        {/* CROP COMPARISON */}
        <motion.div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h4>{tr("mt.cropComparison")}</h4>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cropCompare} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />

              <Bar dataKey="profit" fill="green" />
              <Bar dataKey="cost" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </section>
  );
}