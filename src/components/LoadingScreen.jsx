import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1200;
    const interval = 16;
    const step = (interval / duration) * 100;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        // Brief pause, then start exit animation
        setTimeout(() => setExiting(true), 200);
      }
      setProgress(current);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // When exiting starts, wait for slide-up animation then complete
  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 650); // slightly longer than 600ms slide-up
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--c-bg)" }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={
        exiting
          ? { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          : {}
      }
    >
      {/* SOO Monogram */}
      <motion.span
        className="font-display font-bold select-none"
        style={{ color: "var(--c-accent)", fontSize: "5rem", lineHeight: 1 }}
        animate={
          exiting
            ? { scale: 1.08, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        SOO
      </motion.span>

      {/* Progress bar */}
      <div
        className="mt-6 overflow-hidden rounded-full"
        style={{
          width: 120,
          height: 2,
          backgroundColor: "var(--c-border)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--c-accent)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};
