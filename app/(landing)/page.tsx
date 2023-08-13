"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div
      className="h-full relative  overflow-hidden 
    selection:text-purple-500
    selection:bg-white bg-neutral-900 bg-gradient-to-br from-purple-900 via-black to-black pb-10  "
    >
      <nav className="p-4 bg-transparent flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logoipsum-280.svg" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            Creata
          </h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="outline" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="flex justify-between items-center relative ">
        <div className="z-10 text-white font-bold py-36 sm:text-left text-center space-y-5 relative sm:left-28 left-0">
          <div className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1 className={cn("spacing",font.className)}>The Ultimate AI Tool</h1>
            <div className={cn(" select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600",font.className)}>
              <TypewriterComponent
                  options={{
                    strings: [
                      "Chatbot.",
                      "Photo Generation.",
                      "Code Assistant.",
                      "Music Generation.",
                      "Video and Animation."
                    ],
                    autoStart: true,
                    loop: true
                  }}
              />
            </div>
          </div>
          <div className="text-sm mt-8 md:text-xl font-light text-zinc-400">
            Explore The Power of AI
          </div>
          <div>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <div className="flex justify-center items-center sm:block">
                <div className="relative group w-[150px]"><div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div><div className="relative px-6 py-3 bg-gray-200 text-black rounded-lg">Get Started</div></div>
              </div>
            </Link>
          </div>
          <div className="text-zinc-400 text-xs md:text-sm font-normal">
            Sign Up Today.
          </div>
        </div>
        <div className="">
          <Image src='/art.jpg' draggable={"false"} alt="" width={500} height={1000} className="rounded-lg absolute  top-0  sm:right-24 right-0"></Image>
        </div>
      </div>
    </div>
  );
}

