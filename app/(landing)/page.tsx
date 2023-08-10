"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div
      className="h-full relative  overflow-hidden 
    selection:text-purple-500 
    selection:bg-white bg-neutral-900 bg-gradient-to-br from-purple-900 via-black to-black pb-10 text-white "
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

      <div className="z-10 text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The Ultimate AI Tool</h1>
          <div className=" select-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
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
            <Button
              variant="premium"
              className="hover:shadow-amber-400 md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start with a Free Trial
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
          Sign In Today.
        </div>
      </div>
    </div>
  );
}
