"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  MessageSquare,
  ImageIcon,
  Video,
  Music,
  Code,
  ArrowRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AnimatedBlob } from "@/components/animate-blob";

const items = [
  {
    title: "AI Chat",
    content: "Our most Advanced Language Model",
    href: "/conversation",
    logo: MessageSquare,
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
  {
    title: "Code Generation",
    content: "Fast and Accurate Code generation",
    href: "/code",
    logo: Code,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "Image Generation",
    content: "Our most Advanced Text to Image Model",
    href: "/image",
    logo: ImageIcon,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Video Generation",
    content: "Our most Advanced Text to Video Model",
    href: "/video",
    logo: Video,
    color: "text-green-300",
    bg: "bg-green-300/10"
  },

  {
    title: "Music Generation",
    content: "Create Music from text",
    href: "/music",
    logo: Music,
    color: "text-blue-300",
    bg: "bg-blue-300/10"
  }
];

const DashBoardPage = () => {
  const router = useRouter();

  return (
    <div className="overflow-x-hidden h-full">
      <div>
        <div className="text-6xl px-6 font-bold text-center selection:bg-purple-300  selection:text-white">
          <h2>Explore AI easily</h2>
          <h2>
            With{" "}
            <span className="text-purple-400 selection:text-red-600">
              Creata
            </span>
          </h2>
        </div>
        <div>
          <p className="text-muted-foreground text-center mt-5 selection:bg-purple-300">
            A Multipurpose AI platform
          </p>
        </div>
      </div>

      <div className="grid w-[98%] grid-cols-1 overflow-hidden lg:grid-cols-3 md:gap-6 gap-2  px-1 md:px-4 selection:bg-white selection:text-purple-500">
        {items.map((item) => {
          return (
            <Card
              onClick={() => router.push(item.href)}
              key="item.title"
              className="relative cursor-pointer text-center md:w-[100%]  py-8 border-black/5 m-2 pl-2 
                rounded-md   hover:shadow-md dark:border-muted  bg-blend-hard-light
                bg-gray-100 dark:bg-gray-900 h-48 lg:h-48 w-[98%]
                "
            >
              <CardHeader className="p-2 ">
                <div className="md:flex  gap-2 h-full">
                  <div className={cn("rounded-sm p-2 h-10 w-10", item.bg)}>
                    <item.logo className={cn("", item.color)} />
                  </div>
                  <CardTitle className="md:ml-2 mt-2 text-left">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardFooter>
                <p className="my-6 text-left  text-gray-400">{item.content}</p>
              </CardFooter>
              <div
                className={cn(
                  "absolute rounded-md bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted opacity-0 transition duration-300 ease-in-out hover:opacity-70",
                  item.bg
                )}
              ></div>
            </Card>
          );
        })}
      </div>
      <AnimatedBlob className="md:-translate-x-[25%]" />
    </div>
  );
};

export default DashBoardPage;
