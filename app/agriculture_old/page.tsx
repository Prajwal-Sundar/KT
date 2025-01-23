"use client";
import React from "react";
import HeroNavbar from "../_components/heronavbar";
import ExamDetails from "../_components/examdetails";
// import ExamDetailCard from "../_components/examDetailCard";
import Carousel from "../_components/Carousel";
import Footer from "../_components/footer";
import ExamDetailsCard from "../_components/examDetailsCard";

export default function Agriculture() {
  return (
    <div className="bg-white">
      <HeroNavbar />
      <ExamDetails />
      <ExamDetailsCard />
      <Carousel />
      <Footer />
    </div>
  );
}
