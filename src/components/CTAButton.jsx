"use client";

import React from "react";
import Link from "next/link";

export default function CTAButton({
  text,
  href = "#",
  color = "transparent",
  hoverColor = "#1a5c11",
  borderColor = "transparent",
  hoverBorderColor = "#1a5c11",
  textColor = "white",
}) {
  return (
    <Link
      href={href}
      style={{
        "--normal-bg": color,
        "--hover-bg": hoverColor,
        "--normal-border": borderColor,
        "--hover-border": hoverBorderColor,
        "--text-color": textColor,
      }}
      className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-lg border-2 overflow-hidden
                 transition-all duration-300 ease-out
                 hover:shadow-lg"
    >
      {/* Background layer */}
      <span
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: "var(--normal-bg)" }}
      />

      {/* Animated hover background */}
      <span
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out
                   group-hover:scale-x-100"
        style={{ backgroundColor: "var(--hover-bg)" }}
      />

      {/* Border with color transition */}
      <span
        className="absolute inset-0 rounded-lg border-2 transition-colors duration-300 pointer-events-none"
        style={{
          borderColor: "var(--normal-border)",
        }}
      />

      <span
        className="absolute inset-0 rounded-lg border-2 opacity-0 transition-opacity duration-300 pointer-events-none
                   group-hover:opacity-100"
        style={{
          borderColor: "var(--hover-border)",
        }}
      />

      {/* Text */}
      <span
        className="relative z-10 transition-transform duration-300"
        style={{ color: "var(--text-color)" }}
      >
        {text}
      </span>
    </Link>
  );
}
