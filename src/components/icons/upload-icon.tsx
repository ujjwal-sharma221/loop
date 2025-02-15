"use client";

import { motion } from "motion/react";
import { forwardRef } from "react";

const UploadIcon = forwardRef<HTMLDivElement>((props, ref) => {
  const arrowVariants = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      ref={ref}
      className="group/drop-[&[active]]:animate-pulse flex size-10 cursor-pointer select-none items-center justify-center rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:bg-accent"
      {...props}
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g variants={arrowVariants} animate="animate">
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </motion.g>
      </svg>
    </div>
  );
});

UploadIcon.displayName = "UploadIcon";

export { UploadIcon };
