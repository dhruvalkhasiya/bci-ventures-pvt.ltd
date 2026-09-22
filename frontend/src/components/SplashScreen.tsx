import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/bci-logo.png";

const SESSION_KEY = "bci_splash_shown";
const DISPLAY_MS = 2200;

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    if (!visible) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DISPLAY_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* radiating particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-gold-400/70"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
                transition={{ duration: 1.8 + Math.random() * 1.2, repeat: Infinity, delay: Math.random() * 1.5 }}
              />
            ))}
          </div>

          {/* glow ring */}
          <motion.div
            className="absolute h-64 w-64 rounded-full bg-gold-500/10 blur-3xl md:h-96 md:w-96"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.15, 1], opacity: [0, 0.8, 0.5] }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={logo}
              alt="Billionaire Concept Ingenuity"
              className="h-20 w-auto drop-shadow-[0_0_30px_rgb(255_184_0_/_35%)] md:h-28"
              initial={{ filter: "brightness(0.6)" }}
              animate={{ filter: "brightness(1)" }}
              transition={{ duration: 1.2 }}
            />
            <motion.p
              className="text-center text-xs font-medium tracking-[0.3em] text-ink/50 md:text-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              LEARN &nbsp;·&nbsp; BUILD &nbsp;·&nbsp; CREATE &nbsp;·&nbsp; GROW
            </motion.p>

            {/* loading bar */}
            <motion.div className="mt-2 h-0.5 w-40 overflow-hidden rounded-full bg-white/10 md:w-56">
              <motion.div
                className="h-full bg-gold-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DISPLAY_MS / 1000 - 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
