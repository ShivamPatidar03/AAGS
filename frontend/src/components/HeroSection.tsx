import { motion } from "framer-motion";
import { Sprout, Sun, Zap, BarChart3, Leaf, CloudRain, TrendingUp, Droplets } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function AnimatedCounter({ end, label, icon: Icon }: { end: string; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const num = parseInt(end) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && num > 0) {
          let start = 0;
          const step = Math.max(1, Math.floor(num / 30));
          const interval = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(interval); }
            else setCount(start);
          }, 40);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="glass-card p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <span className="text-2xl font-display font-bold text-foreground">{num > 0 ? count : end}</span>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

function FloatingIcon({ icon: Icon, className, delay = 0 }: { icon: React.ElementType; className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`absolute ${className}`}
    >
      <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut" }}>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/8 backdrop-blur-sm border border-primary/10 flex items-center justify-center shadow-lg shadow-primary/5">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { tr } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228B22' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <FloatingIcon icon={Sprout} className="top-32 left-[10%] hidden md:block" delay={0.2} />
      <FloatingIcon icon={Leaf} className="top-40 right-[8%] hidden md:block" delay={0.5} />
      <FloatingIcon icon={CloudRain} className="bottom-32 left-[15%] hidden md:block" delay={0.8} />
      <FloatingIcon icon={TrendingUp} className="bottom-40 right-[12%] hidden md:block" delay={1.1} />
      <FloatingIcon icon={Droplets} className="top-1/2 left-[5%] hidden lg:block" delay={0.4} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/10">
                <Sprout className="w-4 h-4" />
                {tr("hero.badge")}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6"
            >
              {tr("hero.title1")}{" "}
              <span className="gradient-text">{tr("hero.title2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-xl text-lg sm:text-xl text-muted-foreground mb-10 font-body leading-relaxed"
            >
              {tr("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.a href="#predict" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow gap-2">
                <BarChart3 className="w-5 h-5" /> {tr("hero.startPrediction")}
              </motion.a>
              <motion.a href="#features" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-base border border-border hover:bg-muted transition-colors">
                {tr("hero.exploreForecast")}
              </motion.a>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AnimatedCounter end="5" label={tr("hero.cropsSupported")} icon={Sprout} />
              <AnimatedCounter end="5" label={tr("hero.multiSoil")} icon={Sun} />
              <AnimatedCounter end="Instant" label={tr("hero.instantForecast")} icon={Zap} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="text-xs text-muted-foreground ml-2 font-medium">AAGS Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: tr("hero.mandiPrice"), value: "₹42/kg", color: "text-primary" },
                    { label: tr("hero.yield"), value: "520 kg", color: "text-accent" },
                    { label: tr("hero.revenue"), value: "₹21,840", color: "text-primary" },
                    { label: tr("hero.profit"), value: "₹14,200", color: "text-success" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-muted/50 rounded-xl p-3 border border-border/30"
                    >
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className={`text-lg font-display font-bold ${item.color}`}>{item.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-end gap-2 h-20 pt-2">
                  {[60, 85, 45, 90, 70, 55, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      className="flex-1 rounded-t-md bg-primary/30"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 -left-4 glass-card px-4 py-3 flex items-center gap-3 shadow-lg"
              >
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tr("hero.profitStatus")}</p>
                  <p className="text-sm font-bold text-success">{tr("hero.growth")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
