import { motion } from "framer-motion";
import { Sprout, Brain, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { tr } = useLanguage();
  const badges = [
    { icon: Brain, label: tr("about.b1") },
    { icon: Sprout, label: tr("about.b2") },
    { icon: Zap, label: tr("about.b3") },
  ];

  return (
    <section id="about-section" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{tr("about.badge")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {tr("about.title1")} <span className="gradient-text">{tr("about.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">{tr("about.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{tr("about.p2")}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {badges.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <b.icon className="w-4 h-4" />
                  {b.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass-card p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "5", label: tr("hero.cropsSupported") },
                { val: "5", label: tr("hero.multiSoil") },
                { val: "3", label: tr("dash.season") },
                { val: "AI", label: tr("hero.instantForecast") },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-display font-bold text-primary">{s.val}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
