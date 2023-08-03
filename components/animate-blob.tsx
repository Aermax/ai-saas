"use client";

import { cn } from "@/lib/utils";

interface AnimatedBlobProps {
  className?: string;
}

export const AnimatedBlob = ({ className }: AnimatedBlobProps) => {
  return (
    <>
      <div
        id="blob"
        className={cn(
          "overflow-hidden blur-[100px] absolute top-1/2 left-1/2 transform  -translate-y-[50%] -translate-x-[50%] h-[500px] w-[500px] rounded-full z-[-2] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
          className
        )}
      ></div>
    </>
  );
};
