"use client";

import Image from "next/image";

export default function Faqs() {
  return (
    <div className="mt-4 pt-6 mb-4 bg-white flex flex-col justify-center items-center">
      <div>
        <div className="text-5xl sm:text-5xl lg:text-[70px] font-Inter font-bold tracking-wider text-center">
          Frequently
        </div>
        <div className="text-2xl sm:text-3xl lg:text-[40px] font-Inter font-semibold flex justify-center items-center text-center sm:mt-2">
          asked questions
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-10 lg:gap-20 mt-6 lg:mt-10">
        <Image
          alt="image"
          src="/pic1.png"
          height={400}
          width={400}
          className="w-full lg:w-auto h-auto"
        />
        <div className="mt-6 lg:mt-0 text-center lg:text-left">
          <div className="text-2xl sm:text-3xl lg:text-[48px] font-Inter font-bold mb-12">
            What is Kalvithadam?
          </div>
          <div className="w-full sm:w-[500px] font-Inter font-medium text-[16px] sm:text-[18px] lg:font-bold lg:text-[20px]">
            Career guidance sessions are pivotal in aiding young individuals to
            make well-informed decisions about their educational pursuits and
            future professional paths immediately after completing their
            schooling.
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center px-4 sm:px-10 lg:gap-8 mt-6 lg:mt-10">
        <div className="  mt-6 lg:mt-0 text-center lg:text-left ">
          <div className="flex flex-col mb-12">
            <span className="text-2xl sm:text-3xl lg:text-[48px] font-Inter font-bold mb-1 lg:mb-4">
              How can we get
            </span>
            <span className="text-2xl sm:text-3xl lg:text-[48px] font-Inter font-bold ">
              in touch with you ?
            </span>
          </div>
          <div className="w-full sm:w-[500px] font-Inter font-medium text-[16px] sm:text-[18px] lg:font-semibold lg:text-[20px]">
            Career guidance sessions are pivotal in aiding young individuals to
            make well-informed decisions about their educational pursuits and
            future professional paths immediately after completing their
            schooling.
          </div>
        </div>
        <Image
          alt="image"
          src="/pic 2.png"
          height={400}
          width={400}
          className="w-full lg:w-auto h-auto"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-10 lg:gap-20 mt-6 lg:mt-10">
        <Image
          alt="image"
          src="/pic 3.png"
          height={400}
          width={400}
          className="w-full lg:w-auto h-auto"
        />
        <div className="mt-6 lg:mt-0 text-center lg:text-left">
          <div className="flex flex-col mb-12">
            <span className="text-2xl sm:text-3xl lg:text-[48px] font-Inter font-bold mb-1 lg:mb-4">
              How can we benefit
            </span>
            <span className="text-2xl sm:text-3xl lg:text-[48px] font-Inter font-bold ">
              from you website?
            </span>
          </div>
          <div className="w-full sm:w-[500px] font-Inter font-medium text-[16px] sm:text-[18px] lg:font-semibold lg:text-[20px]">
            Career guidance sessions are pivotal in aiding young individuals to
            make well-informed decisions about their educational pursuits and
            future professional paths immediately after completing their
            schooling.
          </div>
        </div>
      </div>
    </div>
  );
}
