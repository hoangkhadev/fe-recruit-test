import React from "react";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-skeleton text-primary px-6 py-3 rounded-full text-xs font-medium animate-pulse ${className}`}
    ></div>
  );
}
