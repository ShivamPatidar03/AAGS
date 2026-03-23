import { motion } from "framer-motion";
import { Wheat, FlaskConical, Brain, PieChart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stepKeys = [
  { icon: Wheat, titleKey: "hiw.s1.title", descKey: "hiw.s1.desc" },
  { icon: FlaskConical, titleKey: "hiw.s2.title", descKey: "hiw.s2.desc" },
  { icon: Brain, titleKey: "hiw.s3.title", descKey: "hiw.s3.desc" },
  { icon: PieChart, titleKey: "hiw.s4.title", descKey: "hiw.s4.desc" },
];

export default function HowItWorksSection() {
  const { tr } = useLanguage();

  return (
    <section id="how-it-works" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("hiw.badge")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {tr("hiw.title1")} <span className="gradient-text">{tr("hiw.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[0, 1, 2].map((i) => (
            <div key={i} className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${25 * (i + 1)}%`, transform: "translateX(-50%) translateY(-50%)" }}>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}>
                <ArrowRight className="w-5 h-5 text-primary/40" />
              </motion.div>
            </div>
          ))}

          {stepKeys.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 text-center relative group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md shadow-primary/20">
                {i + 1}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{tr(step.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{tr(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
