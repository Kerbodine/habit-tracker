import React from "react";
import { BiStop } from "react-icons/bi";

export default function HabitCard({ title, date }) {
  let startDate = new Date(date);
  let dateDif =
    (startDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24 * -1); // negate date

  return (
    <div className="relative h-36 w-48 flex-none rounded-lg border-2 border-gray-200 p-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="absolute left-3 bottom-3 z-10 flex gap-3">
        <button className="grid h-8 w-8 place-items-center rounded-full bg-gray-200 bg-opacity-50 text-2xl text-gray-400 transition-colors hover:bg-accent hover:text-white">
          <BiStop />
        </button>
      </div>
      <div className="absolute bottom-3 right-3 flex flex-col items-end text-gray-900 text-opacity-40">
        <h3 className="text-6xl font-semibold tracking-tight">
          {Math.round(dateDif)}
        </h3>
        <p className="-mt-1 font-semibold">days</p>
      </div>
    </div>
  );
}
