"use client";

import React, { useEffect, useState } from "react";
import Cards from "./cards";

type CareerOptions = {
  id: number;
  Profile: string;
  ExamName: string;
  img: string;
  Color: string;
};

export default function Career() {
  const [data, setData] = useState<CareerOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false); // Track if "See More" is clicked

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/domains");
        if (!response.ok) {
          throw new Error("Failed to fetch domains");
        }
        const result = await response.json();
        // console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const careers: CareerOptions[] = result.map((domain: any) => ({
          id: domain.id,
          Profile: domain.Profile,
          ExamName: domain.ExamName || "Exam Placeholder", // Use placeholder if ExamName is missing
          img:
            domain.img ||
            "https://prod-files-secure.s3.us-west-2.amazonaws.com/b020cb67-a9a0-4a42-84cd-216945bf98f8/67927879-b327-473a-90b9-41a3ca2c41fe/temple.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45FSPPWI6X%2F20241223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241223T062251Z&X-Amz-Expires=3600&X-Amz-Signature=39d5eed40548a4c13b39b5291f3a0d01d77730d4872c39769181055bb96d3ce3&X-Amz-SignedHeaders=host&x-id=GetObject", // Default image if not provided
          Color: domain.Color || "#F0F0F0", // Default color if not provided
        }));
        setData(careers);
      } catch (error) {
        console.error("Error fetching career data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle showMore state on button click
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-bold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white pb-5" id="careerSection">
      <div className=" pt-16 pl-18px">
        <div>
          <div className="text-3xl font-Poppins font-bold text-black mb-0">
            Find Your Career
          </div>
          <div className="leading-none -mt-3">
            <span className="text-3xl font-Poppins font-bold text-black">
              Start Your
            </span>
            <span className="text-4xl font-Rochester text-black"> journey</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-[100px] justify-center">
        {(showMore ? data : data.slice(0, 3)).map((item: CareerOptions) => (
          <Cards
            key={item.id}
            Profile={item.Profile || ""}
            ExamName={item.ExamName}
            img={item.img}
            Color={item.Color}
          />
        ))}
      </div>
      <div className="mb-2 flex justify-center mt-8 ">
        <button
          className="flex items-center justify-center bg-mainBlue p-4 rounded-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={toggleShowMore} // Handle the button click
        >
          <div className="text-md md:text-xl font-Poppins text-white font-semibold">
            {showMore ? "Show Less" : "See More"}
          </div>
        </button>
      </div>
    </div>
  );
}
