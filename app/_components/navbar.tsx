"use client";

import { Link } from "react-scroll";

export default function Navbar() {
  return (
    <nav className="bg-mainBlue text-white rounded-full flex flex-row items-center my-3 px-6 py-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto md:px-4 md:py-2">
      <div className="flex gap-5 sm:gap-12 md:gap-20">
        <span className="text-xs md:text-sm  font-semibold">IGNITTE</span>
        <a href="#home" className="hover:text-gray-300 text-xs md:text-sm">
          Home
        </a>
        <Link
          to="about"
          smooth={true}
          delay={100}
          className="hover:text-gray-300 text-xs md:text-sm cursor-pointer"
        >
          About Us
        </Link>
        <a href="#contact" className="hover:text-gray-300 text-xs md:text-sm">
          Contact Us
        </a>
      </div>
    </nav>
  );
}
