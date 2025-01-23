"use client";
// import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Main() {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [textContainerHeight, setTextContainerHeight] = useState(0);

  useEffect(() => {
    if (textContainerRef.current) {
      setTextContainerHeight(textContainerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const textContainerTop = (textContainerRef.current?.offsetTop ||
        0) as number;
      const viewportTop = window.scrollY;
      const imageSectionHeight = window.innerHeight;

      const overlap = Math.max(
        0,
        Math.min(
          textContainerHeight,
          imageSectionHeight - (viewportTop - textContainerTop)
        )
      );
      let val;
      if (window.innerWidth < 768) {
        // Mobile
        val = 0.5;
      } else if (window.innerWidth < 1024) {
        // Tablet (e.g., iPad)
        val = 1.2;
      } else {
        // Desktop/Laptop
        val = 1;
      }

      const opacity = overlap / (val * textContainerHeight);

      controls.start({ opacity });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, controls, textContainerHeight]);

  return (
    <main>
      <div className="wrapper">
        <section className="h-screen w-full sticky top-0">
          <motion.div
            className="flex justify-center items-center h-screen flex-col sticky top-0"
            animate={controls}
            ref={textContainerRef}
          >
            <motion.div className="text-4xl sm:text-3xl md:text-[70px] md:mb-8 lg:text-[96px] font-Inter font-bold text-black lg:my-8">
              Empowering Your
            </motion.div>
            <motion.div className="text-4xl sm:text-3xl md:text-[70px] md:mb-8 lg:text-[96px] font-Inter font-bold text-black lg:my-8">
              Career Journey
            </motion.div>
            <motion.div className="text-4xl sm:text-3xl md:text-[70px] lg:text-[96px] font-Inter font-bold text-black lg:my-8">
              Forward
            </motion.div>
          </motion.div>
        </section>

        <section className="flex justify-center items-center h-screen sticky top-0 overflow-hidden">
          {/* <Image
            className="ml-1 sm:ml-0"
            src="/image.png"
            alt="image"
            height={400}
            width={900}
          /> */}
          <iframe
            className="ml-1 sm:ml-0 rounded-xl"
            width="900"
            height="400"
            src="https://www.youtube.com/embed/cZUlPLV1ZUY?si=xE_NpwJRskZ0vBGY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>
      </div>
    </main>
  );
}
