"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div id="about" className="mt-16 pb-4 bg-white">
      <div className="pl-6">
        <button className="flex items-center justify-center bg-mainBlue p-4 rounded-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          <div className="text-md md:text-xl font-Poppins text-white font-semibold">
            About Us
          </div>
        </button>
      </div>
      <div className="p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start">
        <div className="relative flex-shrink-0 w-full md:w-[500px]">
          <Image
            src="/about.png"
            alt="Career guidance session"
            width={1400}
            height={1400}
            className="rounded-lg shadow-md"
          />
          <div className="absolute bottom-[-15px] bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg">
            <div>Mentored</div>
            <div>500+ Students</div>
          </div>
        </div>
        <div className="flex-grow  md:ml-20 md:-mt-2">
          <h2 className="text-5xl font-extrabold font-Poppins mb-3">
            Kalvithadam
          </h2>
          <p className="text-xl md:text-2xl font-Roboto text-gray-700 leading-relaxed">
            Career guidance sessions are pivotal in aiding young individuals to
            make well-informed decisions about their educational pursuits and
            future professional paths immediately after completing their
            schooling. Recognizing this significance, IGNITTE actively engages
            in organizing career guidance sessions across various government
            schools under the banner of Kalvithadam sub-domain. schooling.
            Recognizing this significance, IGNITTE actively engages in
            organizing career guidance sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
