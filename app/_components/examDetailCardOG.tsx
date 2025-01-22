/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

type CareerDetails = {
  id: number;
  mainHeading: string;
  subHeading: string;
  content: Array<string>;
  Color: string;
};

export default function ExamDetailCard() {
  const [data, setData] = useState<CareerDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/domains/agriculture"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch domains: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("API response:", result);

        // Transform object into an array to match your component's expectations
        const careers: CareerDetails[] = [
          {
            id: 1,
            mainHeading: result.mainHeading,
            subHeading: result.subHeading || "---",
            content: result.content || [], // Split multiline string into array,
            Color: result.Color,
          },
        ];

        setData(careers);
      } catch (error) {
        console.error("Error fetching career data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-bold">Loading...</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="pl-[15vw] w-screen">
        {data.map((item: CareerDetails) => (
          <div
            key={item.id}
            className="w-[75vw] p-4 rounded-2xl mb-4"
            style={{ backgroundColor: item.Color }}
          >
            <div className="text-xl font-Roboto font-bold">
              {item.mainHeading}
            </div>
            <div className="text-lg font-Roboto pl-5 pt-2">
              {item.subHeading}
            </div>
            <div className="text-lg font-Roboto pl-5 pt-2">
              <ul className="list-disc pl-5">
                {item.content.map((e: string, index: number) => (
                  <li key={index}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
