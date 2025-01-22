"use client";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import React from "react";

export default function HeroNavbar() {
  return (
    <div className="relative h-[280px] md:h-[500px] lg:h-[530px]">
      {/* Large screen image */}
      <div className="m-0 p-0 hidden lg:block">
        <Image
          alt="bluecurve-large"
          src="/bluecurve-large.png"
          height={368}
          width={1400}
          className="w-full h-auto"
        />
      </div>

      {/* Small screen image */}
      <div className="lg:hidden">
        <Image
          alt="bluecurve-small"
          src="/bluecurve-small.png"
          height={368}
          width={800}
          className="w-full h-auto"
        />
      </div>

      {/* Navbar */}
      <nav className="bg-mainBlue text-white rounded-full flex flex-row items-center my-3 px-6 py-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto md:px-4 md:py-2 absolute top-[10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="flex gap-5 sm:gap-12 md:gap-20">
          <span className="text-xs md:text-sm font-semibold">IGNITTE</span>
          <Link href="/" className="hover:text-gray-300 text-xs md:text-sm">
            Home
          </Link>
          <Link href="/" className="hover:text-gray-300 text-xs md:text-sm">
            About Us
          </Link>
          <a href="#contact" className="hover:text-gray-300 text-xs md:text-sm">
            Contact Us
          </a>
        </div>
      </nav>

      {/* Responsive text */}
      <div className="flex flex-col justify-center items-center absolute top-[80px] md:top-[150px] lg:top-[130px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-xs sm:text-xs md:text-3xl md:pl-5 md:w-[500px] lg:w-[600px] lg:text-4xl lg:pl-10 font-Poppins font-normal text-white">
          Explore the Flourishing World of
        </div>
        <div className="text-xl sm:text-2xl md:p-2 md:text-[32px] font-Poppins font-extrabold text-orangeColor">
          Agriculture
        </div>
      </div>
      <div className="absolute top-[110px] md:top-[210px] lg:top-[180px] left-1/2 transform -translate-x-1/2 z-10">
        <Image src="/image.png" alt="image" height={500} width={500} />
      </div>
      <div className="absolute top-[200px] md:top-[400px] left-1/2 transform -translate-x-1/2 z-10 lg:top-[430px]">
        <div className="mb-2 flex justify-center mt-8 ">
          <ScrollLink
            smooth={true}
            duration={500}
            to="eligibility"
            className="flex items-center justify-center bg-orangeColor p-3 rounded-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="text-md md:text-xl font-Poppins text-white font-semibold">
              Learn More
            </div>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
}
