import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface LogoProps {
  onAnimationComplete: () => void;
}

const pathVariants: Variants = {
  initial: (direction: string) => ({
    opacity: 0,
    x: direction === "left" ? -150 : direction === "right" ? 150 : 0,
    y: direction === "top" ? -150 : 0,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

const Logo: React.FC<LogoProps> = ({ onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 1500);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [isAnimating, onAnimationComplete]);

  return (
    <svg
      fill="none"
      height="139"
      viewBox="0 0 116 139"
      width="116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate="animate"
        custom="left"
        d="M7.87226 28.7661H0.154358L0 22.3649H50.012V28.6871H42.2169C38.5123 28.6871 33.5729 31.6901 33.5729 40.3042V125.496C33.5729 129.131 36.1969 129.922 41.6766 129.922H76.1756C84.511 129.922 101.588 120.127 109.363 104.949L116 106.213C113.157 123.233 97.3041 137.748 81.7325 138.615C66.1609 139.482 0.077179 138.615 0.077179 138.615V133.004H7.40918C11.8856 133.004 15.976 129.922 15.976 124.785V37.5382C15.976 31.5321 12.2715 28.7661 7.87226 28.7661Z"
        fill="black"
        initial="initial"
        transition={{ duration: 1 }}
        variants={pathVariants}
        onAnimationComplete={() => setIsAnimating(false)}
      />
      <motion.path
        animate="animate"
        custom="top"
        d="M9.1843 116.092H0.077179V110.086H6.86893L9.1843 108.742V116.092Z"
        fill="black"
        initial="initial"
        transition={{ duration: 1, delay: 0.5 }}
        variants={pathVariants}
        onAnimationComplete={() => setIsAnimating(false)}
      />
      <motion.path
        animate="animate"
        custom="right"
        d="M33.5729 9.56236V15.0943V15.4894H16.0532V13.1976C16.1134 8.0618 13.2748 5.45292 6.71457 5.45292H0V0H58.1158C85.368 2.72516 96.6631 15.2399 97.1683 26.7114V34.3771C97.4611 40.3859 92.932 48.7788 80.652 55.6355C79.7775 56.0495 80.2254 56.3341 80.652 56.821C97.2661 62.2589 103.024 71.1388 102.648 81.7147V86.5354C101.585 104.574 84.3538 116.207 60.2768 116.092H40.982V107.478C42.6014 108.003 43.2974 108.189 47.6194 108.11C51.9414 108.031 58.4245 108.11 58.4245 108.11C68.5602 107.051 81.1848 99.8346 81.1151 86.5354V83.4533C81.3504 68.682 63.9675 59.9493 52.6361 59.903C41.3046 59.8568 40.996 60.0267 40.982 59.903V52.6325H54.8742C66.6577 51.6921 77.8095 44.8069 78.1823 33.1126V27.8968C77.419 17.4791 64.1783 7.30426 51.4784 6.87541H44.4551C39.67 6.87541 33.5729 7.27055 33.5729 9.56236Z"
        fill="black"
        initial="initial"
        transition={{ duration: 1, delay: 0.5 }}
        variants={pathVariants}
        onAnimationComplete={() => setIsAnimating(false)}
      />
    </svg>
  );
};

export default Logo;
