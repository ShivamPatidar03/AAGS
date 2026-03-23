import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const crops = [
  { emoji: "🍅", name: "Tomato", yield: "3-5 kg/sqm", price: "₹15-55/kg", season: "Winter, Monsoon", gradient: "from-destructive/10 to-accent/10" },
  { emoji: "🌶", name: "Capsicum", yield: "2-4 kg/sqm", price: "₹30-90/kg", season: "Winter", gradient: "from-warning/10 to-destructive/10" },
  { emoji: "🥒", name: "Cucumber", yield: "4-6 kg/sqm", price: "₹10-40/kg", season: "Summer, Monsoon", gradient: "from-primary/10 to-success/10" },
  { emoji: "🍉", name: "Watermelon", yield: "5-8 kg/sqm", price: "₹8-25/kg", season: "Summer", gradient: "from-success/10 to-primary/10" },
  { emoji: "🥬", name: "Cabbage", yield: "3-5 kg/sqm", price: "₹10-35/kg", season: "Winter", gradient: "from-primary/10 to-muted/30" },
];

export default function CropInsights() {
  const { tr } = useLanguage();

  return (
    <section id="crop-insights" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("ci.badge")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {tr("ci.title1")} <span className="gradient-text">{tr("ci.title2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">{tr("ci.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {crops.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass-card overflow-hidden group cursor-default"
            >
              <div className={`h-28 bg-gradient-to-br ${crop.gradient} flex items-center justify-center`}>
                <motion.span className="text-5xl" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  {crop.emoji}
                </motion.span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-display font-bold">{tr(`crop.${crop.name}`)}</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{tr("ci.typicalYield")}</span>
                    <span className="font-semibold">{crop.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{tr("ci.marketPrice")}</span>
                    <span className="font-semibold">{crop.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{tr("ci.bestSeason")}</span>
                    <span className="font-semibold text-primary">{crop.season}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
