import { Sidebar } from "@/components/SideBar";
import Navbar from "@/components/Navbar";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { cn } from "@/lib/utils";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className={cn("h-full  relative")}>
      <div className="hidden md:flex">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72">
        <div className="flex justify-between">
          <Navbar />
          <div className="p-5">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
