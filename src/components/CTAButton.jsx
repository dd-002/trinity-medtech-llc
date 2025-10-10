"use client";

import React from "react";

export default function CTAButton({ text, href = "#" }) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center px-2 py-3 text-sm font-bold text-white rounded-lg border-2 border-white overflow-hidden
                 before:absolute before:inset-0 before:bg-[#1f6c15] before:origin-left before:scale-x-0 before:text-black before:transition-transform before:duration-300 before:ease-in-out before:border-[#1f6c15]
                 hover:before:scale-x-100 z-10"
    >
      <span className="relative z-20">{text}</span>
    </a>
  );
}
