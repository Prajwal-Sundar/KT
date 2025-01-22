"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Carousel() {
  // Items with associated college names
  const items = [
    { image: "/college1.png", name: "Indian Institute of Technology, Bombay" },
    { image: "/college2.jpg", name: "Indian Institute of Technology, Delhi" },
    {
      image: "/college3.jpg",
      name: "BITS Pilani",
    },
    {
      image: "/college4.jpg",
      name: "National Institute of Technology, Trichy",
    },
    {
      image: "/college5.jpg",
      name: "Vellore Institute of Technology, Vellore",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false); // To manage the transition effect

  const handleNext = () => {
    setFade(true); // Start fading out
    setTimeout(() => {
      setFade(false); // Reset fade effect after transition
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 300); // Matches CSS transition duration
  };

  const handlePrev = () => {
    setFade(true); // Start fading out
    setTimeout(() => {
      setFade(false); // Reset fade effect after transition
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    }, 300); // Matches CSS transition duration
  };

  return (
    <div className="flex flex-col lg:flex-row items-center pt-8 lg:pt-[15vh]">
      {/* Left Section */}
      <div className="flex flex-col lg:pl-[15vw] px-6 text-center lg:text-left">
        <div className="text-xl md:text-2xl font-Roboto font-extrabold text-mainBlue">
          Top Colleges
        </div>
        <div className="text-xl md:text-2xl font-Roboto font-extrabold text-orangeColor">
          And its Details
        </div>
        <div className="bg-mainBlue p-2 mt-3 text-lg md:text-xl text-white font-Roboto font-extrabold w-[150px] rounded-lg mx-auto lg:mx-0">
          Public College
        </div>
        {/* Dynamic College Name with Fade Transition */}
        <div
          className={`text-[#474747] mt-4 text-lg md:text-xl font-Roboto font-extrabold transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {items[currentIndex].name}
        </div>
        <div className="flex mt-6 justify-center lg:justify-start">
          <button className="flex items-center justify-center bg-[#F95E61] px-4 py-2 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg mr-4 rounded-lg">
            <div className="text-md md:text-lg font-Poppins text-white font-semibold">
              Visit Website
            </div>
          </button>
          <button className="flex items-center justify-center bg-[#6A3DFF] px-4 py-2 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg rounded-lg">
            <div className="text-md md:text-lg font-Poppins text-white font-semibold">
              Fee Details
            </div>
          </button>
        </div>
      </div>
      {/* Right Section - Carousel */}
      <div className="relative w-full max-w-lg md:max-w-2xl mx-auto p-4">
        <div className="relative flex items-center justify-center h-64 md:h-80 mt-10 lg:mt-0">
          {items.map((item, index) => {
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
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            );
          })}
        </div>
        {/* Arrows */}
        <div className="flex justify-center mt-10 space-x-6">
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
    </div>
  );
}
