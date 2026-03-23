import { Leaf, Github, Mail, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { tr } = useLanguage();

  return (
    <footer id="contact" className="border-t border-border/50 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">AAGS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tr("footer.desc")}</p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">{tr("footer.platform")}</h4>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { label: tr("nav.home"), href: "#home" },
                { label: tr("nav.dashboard"), href: "#predict" },
                { label: tr("nav.marketTrends"), href: "#market-trends" },
                { label: tr("nav.features"), href: "#features" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="block hover:text-foreground transition-colors">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">{tr("footer.resources")}</h4>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              {["Documentation", "API Reference", "Research", "Blog"].map((item) => (
                <a key={item} href="#" className="block hover:text-foreground transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">{tr("footer.stayUpdated")}</h4>
            <p className="text-sm text-muted-foreground mb-4">{tr("footer.newsletter")}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{tr("footer.copyright")}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">{tr("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{tr("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
