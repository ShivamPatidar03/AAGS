import { motion } from "framer-motion";
import { Brain, Sprout, Factory, Cpu, BarChart3, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const logos = [
  { icon: Brain, label: "AI" },
  { icon: Sprout, label: "Agriculture" },
  { icon: Factory, label: "Greenhouse" },
  { icon: Cpu, label: "ML" },
  { icon: BarChart3, label: "Data Analytics" },
  { icon: Leaf, label: "Smart Farming" },
];

export default function LogoStrip() {
  const { tr } = useLanguage();

  return (
    <section className="py-14 sm:py-20 border-y border-border/30 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-10 tracking-wide uppercase">
          {tr("logo.title")}
        </p>
        <div className="flex gap-10 sm:gap-14 justify-center flex-wrap">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.15, y: -2 }}
              className="flex items-center gap-3 text-muted-foreground/50 hover:text-primary transition-all duration-300 cursor-default group"
            >
              <div className="w-10 h-10 rounded-xl bg-muted/60 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <logo.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-semibold tracking-wide">{logo.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
