import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import HabitMenu from "./HabitMenu";

export default function HabitCard({ id, title, date }) {
  let startDate = new Date(date);
  let dateDif =
    (startDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24 * -1); // negate date

  return (
    <div className="group relative h-36 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 px-4 py-3 transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 hover:shadow-lg">
      <h2 className="two-line w-full text-lg font-semibold tracking-tight text-gray-700">
        {title}
      </h2>
      <div className="absolute right-2 top-2 hidden group-hover:block">
        <HabitMenu id={id} />
      </div>
      <div className="absolute bottom-3 right-4 z-10 flex flex-col items-end text-gray-900 text-opacity-40">
        <h3 className="text-5xl font-semibold tracking-tight">
          {Math.round(dateDif)}
        </h3>
        <p className="-mt-1 font-semibold">days</p>
      </div>
      <div className="absolute -bottom-8 -left-6 text-9xl text-gray-100 transition-colors group-hover:text-gray-300/75">
        <HiCheckCircle />
      </div>
    </div>
  );
}
