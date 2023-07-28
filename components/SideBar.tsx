"use client"

import React from 'react'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import {
    LayoutDashboard,
    MessageSquare,
    ImageIcon,
    Video,
    Music,
    Code,
    Settings
} from "lucide-react"

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FreeCounter } from './free-counter'
import { getApiLimitCount } from '@/lib/api-limit'

import { ModeToggle } from './theme-toggle'


const montserrat = Montserrat({
    weight:"600",
    subsets: ["cyrillic"]
})

const routes = [
    {
        title:"DashBoard",
        href:"/dashboard",
        logo: LayoutDashboard,
        color: "text-sky-500"
    },
    {
        title:"Conversation",
        href:"/conversation",
        logo: MessageSquare,
        color: "text-violet-500"
    },
    {
        title:"Image Generation",
        href:"/image",
        logo: ImageIcon,
        color: "text-emerald-500"
    },
    {
        title:"Video Generation",
        href:"/video",
        logo: Video,
        color: "text-green-300"
    },
    
    {
        title:"Music Generation",
        href:"/music",
        logo: Music,
        color: "text-blue-300"
    },
    {
        title:"Code Generation",
        href:"/code",
        logo: Code,
        color: "text-red-500"
    },
    {
        title:"Settings",
        href:"/settings",
        logo: Settings,
        color: "text-white"
    }
]

export const Sidebar = ({isPro, apiLimitCount} : {isPro: boolean, apiLimitCount: number}) => {
    const router = useRouter()
    const pathName = usePathname()



  return (
    <div className={cn("px-3 pt-2 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 text-white",montserrat.className)}>
        <div className='mb-4 flex p-4'>
            <div>
            <Image
                draggable="false"
                width={60}
                height={60}
                src="/logoipsum-280.svg"
                alt="logo"
            />
            </div>
            <h1 className={cn("text-xl ml-2")}>Creata.ai</h1>
        </div>
        
        <div>
        {
            routes.map((route)=>{
                    return (
                    <div 
                        className={cn("cursor-pointer hover:bg-gray-700 rounded-md py-2 px-2 font-light",
                            pathName === route.href && "bg-gray-700"
                        )}
                        onClick={()=>router.push(route.href)}
                        key={route.href}>
                    <div className='flex'>
                        <route.logo className={cn("h-5 w-5 mr-3", route.color)}/>
                        <h1>{route.title}</h1>
                    </div>
                    </div>)

            })
        }
        </div>
        <div className="h-full md:mt-[80%]">
            <FreeCounter  isPro={isPro} apiLimitCount={apiLimitCount}/>
        </div>
    </div>
  )
}

