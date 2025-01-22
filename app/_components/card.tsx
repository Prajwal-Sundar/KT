"use client";

import Image from "next/image";
import React, { useState } from "react";

interface CardProps {
  title: string;
  answer: string;
}
export default function Card({ title, answer }: CardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle open/close state on hover
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="mt-3 flex justify-center items-center">
      <div
        className="group rounded-3xl w-[300px] md:w-[650px] border border-gray-200 bg-gray-50 transition-all duration-300 
        ease-in-out ransform hover:scale-105 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <dt
          className="flex justify-between items-center cursor-pointer -mb-2 mt-4 ml-9 mr-8"
          aria-controls="faq-1"
        >
          <p className="font-semibold text-lg leading-none">{title}</p>
          <Image
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-0" : "-rotate-180"
            }`}
            src="/up.png"
            alt="up"
            height={20}
            width={20}
          />
        </dt>
        <dd
          id="faq-1"
          className={`text-lg font-light mt-6 ml-9 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 pb-2 pl-2 pr-2" : "max-h-0 opacity-0"
          }`}
        >
          <p>{answer}</p>
        </dd>
      </div>
    </div>
  );
}
