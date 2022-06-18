import React from "react";

export default function HabitCard({ title }) {
  return (
    <div className="h-36 w-48 rounded-lg border-2 border-gray-200">{title}</div>
  );
}
