"use client";

import { motion } from "motion/react";
import { useState } from "react";

const MenuIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  const lineVariants = {
    initial: { y: 0 },
    hover: (custom: number) => ({
      y: custom === 1 ? -2 : custom === 3 ? 2 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }),
  };

  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-accent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          variants={lineVariants}
          animate={isHovered ? "hover" : "initial"}
          custom={1}
        />
        <motion.line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          variants={lineVariants}
          animate={isHovered ? "hover" : "initial"}
          custom={2}
        />
        <motion.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={lineVariants}
          animate={isHovered ? "hover" : "initial"}
          custom={3}
        />
      </svg>
    </div>
  );
};

export { MenuIcon };
