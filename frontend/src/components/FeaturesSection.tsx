import { motion } from "framer-motion";
import { BarChart3, Leaf, TrendingUp, CalendarDays, LayoutDashboard, LineChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const featureKeys = [
  { icon: BarChart3, titleKey: "features.f1.title", descKey: "features.f1.desc" },
  { icon: Leaf, titleKey: "features.f2.title", descKey: "features.f2.desc" },
  { icon: TrendingUp, titleKey: "features.f3.title", descKey: "features.f3.desc" },
  { icon: CalendarDays, titleKey: "features.f4.title", descKey: "features.f4.desc" },
  { icon: LayoutDashboard, titleKey: "features.f5.title", descKey: "features.f5.desc" },
  { icon: LineChart, titleKey: "features.f6.title", descKey: "features.f6.desc" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function FeaturesSection() {
  const { tr } = useLanguage();

  return (
    <section id="features" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("features.badge")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {tr("features.title1")} <span className="gradient-text">{tr("features.title2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">{tr("features.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map((f, i) => (
            <motion.div
              key={f.titleKey}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-6 sm:p-8 flex flex-col gap-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors relative">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold relative">{tr(f.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed relative">{tr(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
