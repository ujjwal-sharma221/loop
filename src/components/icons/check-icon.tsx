"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const pathVariants: Variants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const CheckIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        className="flex items-center justify-center rounded-md p-2"
        ref={ref}
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
          <motion.path
            variants={pathVariants}
            initial="initial"
            animate="animate"
            d="M4 12 9 17L20 6"
          />
        </svg>
      </div>
    );
  },
);

CheckIcon.displayName = "CheckIcon";

export { CheckIcon };
