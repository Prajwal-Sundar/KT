"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

export default function Main() {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const fadePoint = 500;
      const opacity = Math.max(1 - scrollY / fadePoint, 0);
      controls.start({ opacity });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, controls]);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Text Section */}
      <motion.div
        className="flex justify-center items-center flex-col h-screen sticky top-0"
        animate={controls}
      >
        <motion.div className="text-4xl sm:text-3xl lg:text-[96px] font-Inter font-bold text-black lg:my-8">
          Empowering Your
        </motion.div>
        <motion.div className="text-4xl sm:text-3xl lg:text-[96px] font-Inter font-bold text-black lg:my-8">
          Career Journey
        </motion.div>
        <motion.div className="text-4xl sm:text-3xl lg:text-[96px] font-Inter font-bold text-black lg:my-8">
          Forward
        </motion.div>
      </motion.div>

      <div className="z-10">
        <Image
          className="ml-1 sm:ml-0"
          src="/image.png"
          alt="image"
          height={400}
          width={900}
        />
      </div>
    </div>
  );
}
