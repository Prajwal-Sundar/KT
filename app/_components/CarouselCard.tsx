"use client";

import React, { useState } from "react";
import Image from "next/image";

const items = [
  "/college1.png",
  "/college2.jpg",
  "/college3.jpg",
  "/college4.jpg",
  "/college5.jpg",
];

const CarouselCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-4">
      {/* Carousel Container */}
      <div className="relative flex items-center justify-center h-80">
        {items.map((image, index) => {
          const isCurrent = index === currentIndex;
          const isPrev =
            index === (currentIndex - 1 + items.length) % items.length;
          const isNext = index === (currentIndex + 1) % items.length;

          let positionClass = "hidden";
          let transformStyle = "";
          let opacity = 0;

          if (isCurrent) {
            positionClass = "z-10";
            transformStyle = "translateX(0)";
            opacity = 1;
          } else if (isPrev) {
            positionClass = "z-5";
            transformStyle = "translateX(-150px) scale(0.9)";
            opacity = 0.6;
          } else if (isNext) {
            positionClass = "z-5";
            transformStyle = "translateX(150px) scale(0.9)";
            opacity = 0.6;
          }

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out ${positionClass}`}
              style={{
                transform: transformStyle,
                opacity: opacity,
              }}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={280}
                height={350}
                className={`rounded-lg shadow-lg`}
              />
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="flex justify-center mt-14 space-x-8">
        <button
          onClick={handlePrev}
          className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600 shadow-lg"
        >
          &#10094; {/* Left Arrow */}
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600 shadow-lg"
        >
          &#10095; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
