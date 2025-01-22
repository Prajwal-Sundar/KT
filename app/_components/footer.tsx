"use client";

import Image from "next/image";
import React from "react";
import { Link } from "react-scroll";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg ">
      <div className="w-full max-w-screen-xl mx-auto md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://ignitte.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image src="/logo.png" alt="Flowbite Logo" width={40} height={70} />
            <span className="self-center text-2xl font-Poppins font-medium tracking-widest whitespace-nowrap">
              IGNITTE
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline mr-4">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2022{" "}
          <a href="https://ignitte.com/" className="hover:underline">
            IGNITTE™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
