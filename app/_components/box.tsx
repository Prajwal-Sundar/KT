"use client";
import React from "react";

export default function Box() {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 w-[400px]">
      <div className="bg-[#CDDDF5] flex flex-col shadow-md rounded-lg">
        <div className="text-2xl font-Inter font-bold">400+</div>
        <div className="text-xl font-Inter font-bold">Mentored Students</div>
      </div>
      <div className="bg-[#CDDDF5] flex flex-col shadow-md rounded-lg">
        <div className="text-3xl font-Inter font-bold ml-2 mb-5">400+</div>
        <div className="text-md font-Inter ml-2">Mentored Students</div>
      </div>
      <div className="bg-[#CDDDF5] flex flex-col shadow-md rounded-lg">
        <div className="text-2xl font-Inter font-bold">400+</div>
        <div className="text-xl font-Inter font-bold">Mentored Students</div>
      </div>
      <div className="bg-[#CDDDF5] flex flex-col shadow-md rounded-lg">
        <div className="text-2xl font-Inter font-bold">400+</div>
        <div className="text-xl font-Inter font-bold">Mentored Students</div>
      </div>
    </div>
  );
}
