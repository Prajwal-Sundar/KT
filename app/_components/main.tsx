"use client";
import Image from "next/image";
import React from "react";
import { Link } from "react-scroll";

export default function Main() {
  return (
    <div className="my-1 flex flex-col justify-center items-center sm:flex-row sm:justify-around sm:items-start sm:gap-10 lg:mb-40">
      <div className="flex flex-col sm:flex-row sm:gap-10 lg:gap-[50px]">
        <div className="mt-4 p-6 mb-5 sm:mt-0">
          <div className="text-4xl sm:text-3xl lg:text-[70px] font-Inter font-bold text-black lg:my-8">
            Empowering Your
          </div>
          <div className="text-4xl sm:text-3xl lg:text-[70px] font-Inter font-bold text-black lg:my-8">
            Career
          </div>
          <div className="mt-2 text-lg sm:text-base lg:text-lg font-Inter text-black">
            Discover. Plan. Achieve Your Dream Career.
          </div>
          <div className="text-lg sm:text-base lg:text-lg font-Inter text-black whitespace-nowrap">
            With Expert Insights
          </div>
          <div className="bg-mainBlue mt-4 p-2 rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center justify-center sm:justify-center lg:inline-block">
            <Link to="careerSection" smooth={true} duration={500}>
              <div className="text-md sm:text-lg lg:text-xl font-Poppins text-white font-semibold">
                Find Your Career
              </div>
            </Link>
          </div>
        </div>
        <Image
          className="ml-1 sm:ml-0"
          src="/image.png"
          alt="image"
          height={400}
          width={500}
        />
      </div>
    </div>
  );
}
