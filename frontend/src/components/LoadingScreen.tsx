import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const { tr } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Background blobs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

          {/* Floating leaves */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.15, y: [20, -15, 20] }}
              transition={{ delay: i * 0.3, duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{
                top: `${30 + i * 15}%`,
                left: `${20 + i * 25}%`,
              }}
            >
              <Leaf className="w-8 h-8 text-primary" />
            </motion.div>
          ))}

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-body font-medium text-muted-foreground mb-8"
          >
            {tr("loading.text")}
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden mb-8">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          {/* AAGS text with letter reveal */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
            </motion.div>
            <div className="flex">
              {"AAGS".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                  className="text-3xl font-display font-bold text-foreground"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
