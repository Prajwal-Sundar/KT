"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row gap-8 px-6 py-12 bg-blue-100">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
        viewport={{ once: true }} // Trigger animation only once
        transition={{ duration: 0.8 }}
        className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between animate-appear "
      >
        <div>
          <h3 className="text-orange-500 text-sm font-bold mb-4">
            How It Started
          </h3>

          <h1 className="font-Inter text-[55px] tracking-tight text-black font-bold leading-tight">
            Our ultimate dream is empowering curious young minds.
          </h1>
        </div>
        <p className="mt-4 text-gray-700 text-base font-bold leading-relaxed relative bottom-0">
          Career guidance sessions are pivotal in aiding young individuals to
          make well-informed decisions about their educational pursuits and
          future professional paths immediately after completing their
          schooling. Recognizing this significance, IGNITTE actively engages in
          organizing career guidance sessions across various government schools
          under the banner of Kalvithadam sub-domain. schooling. Recognizing
          this significance, IGNITTE actively engages in organizing career
          guidance sessions.
        </p>
      </motion.div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
          viewport={{ once: true }} // Trigger animation only once
          transition={{ duration: 0.8 }}
          className="flex-1 bg-blue-50 p-6 rounded-xl shadow-lg flex items-center justify-center"
        >
          <Image
            src="/about.png"
            alt="Career guidance session"
            width={1400}
            height={1400}
            className="rounded-lg shadow-md"
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
            viewport={{ once: true }} // Trigger animation only once
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h4 className="text-[32px] font-bold text-blue-800">400+</h4>
            <p className="text-sm text-gray-600">Mentored Students</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
            viewport={{ once: true }} // Trigger animation only once
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h4 className="text-[32px] font-bold text-blue-800">5+</h4>
            <p className="text-sm text-gray-600">Years of Teaching</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
            viewport={{ once: true }} // Trigger animation only once
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h4 className="text-[32px] font-bold text-blue-800">15+</h4>
            <p className="text-sm text-gray-600">Career Fields</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Start with fade and slide up
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible state
            viewport={{ once: true }} // Trigger animation only once
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h4 className="text-[32px] font-bold text-blue-800">40+</h4>
            <p className="text-sm text-gray-600">Trusted Mentors</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
