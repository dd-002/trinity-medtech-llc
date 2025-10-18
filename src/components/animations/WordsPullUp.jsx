// WordsPullUpMotion.jsx

import React, { useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function WordsPullUpMotion({
  text = "",
  fontSize = "1.25rem",
  color = undefined,
  weight = 600,
  lineHeight = "1.1",
  stagger = 0.05,
  delay = 0,
  duration = 0.45,
  direction = "up",
  preserveWhitespace = false,
  className = "",
  style = {},
  ariaLabel = undefined,
  threshold = 0.2,
  gap = "0.25rem",
  opacity = 1,
}) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  React.useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView, controls]);

  const tokens = useMemo(() => {
    if (preserveWhitespace) return text.split(/(\s+)/).filter(Boolean);
    return text.split(/\s+/).filter(Boolean);
  }, [text, preserveWhitespace]);

  const yDistance = direction === "up" ? 16 : -16; // slightly reduced to avoid big shift

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const word = {
    hidden: { y: yDistance, opacity: 0 },
    show: {
      y: 0,
      opacity,
      transition: { duration, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const fontSizeCss = typeof fontSize === "number" ? `${fontSize}px` : fontSize;

  return (
    <motion.span
      ref={ref}
      role={ariaLabel ? "group" : undefined}
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap align-baseline overflow-visible ${className}`}
      initial="hidden"
      animate={controls}
      variants={container}
      style={{ fontSize: fontSizeCss, color, fontWeight: weight, lineHeight, ...style }}
    >
      {tokens.map((tok, i) => {
        if (preserveWhitespace && /\s+/.test(tok)) {
          return (
            <span key={`ws-${i}`} style={{ whiteSpace: "pre" }}>
              {tok}
            </span>
          );
        }

        const isLast = i === tokens.length - 1;

        return (
          <motion.span
            key={`${tok}-${i}`}
            variants={word}
            className="inline-block align-baseline will-change-transform"
            style={{
              marginRight: isLast ? 0 : gap,
              verticalAlign: "baseline",
            }}
          >
            {tok}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
