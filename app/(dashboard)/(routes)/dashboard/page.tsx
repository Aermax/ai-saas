"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

import {
  MessageSquare,
  ImageIcon,
  Video,
  Music,
  Code,
  ArrowRight
} from "lucide-react"
import { Card } from '@/components/ui/card'

const items = [

  {
      title:"Conversation",
      href:"/conversation",
      logo: MessageSquare,
      color: "text-violet-500",
      bg: "bg-violet-500/10"
  },
  {
      title:"Image Generation",
      href:"/image",
      logo: ImageIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
  },
  {
      title:"Video Generation",
      href:"/video",
      logo: Video,
      color: "text-green-300",
      bg: "bg-green-300/10"
  },
  
  {
      title:"Music Generation",
      href:"/music",
      logo: Music,
      color: "text-blue-300",
      bg: "bg-blue-300/10"
  },
  {
      title:"Code Generation",
      href:"/code",
      logo: Code,
      color: "text-red-500",
      bg: "bg-red-500/10"
  }
]

const DashBoardPage = () => {

  const router = useRouter()

 

  return (
    <div>
      <div>
      <div className='text-6xl font-bold text-center selection:bg-purple-300'>
          <h2>Explore AI easily</h2>
        <h2>With <span className="text-purple-400 selection:text-red-600">Creata</span></h2>
      </div>
      <div>
        <p className="text-muted-foreground text-center mt-5 selection:bg-purple-300">A Multipurpose AI platform</p>
      </div>
      </div>

      <div className="flex items-center flex-col px-5 selection:bg-purple-300">
        {
          items.map((item)=>{
            return (

              <Card 
                
                key="item.title"
                className="cursor-pointer text-center md:w-1/2 w-full py-8 border-black/5 m-2 p-3 
                rounded-md   hover:shadow-md dark:border-muted dark:px-4 bg-blend-hard-light"
                
              >
                <div 
                  onClick={()=>router.push(item.href)}
                  className='flex justify-between w-full items-center'
                  >
                  <div className="flex gap-4">
                    <div className={cn("rounded-sm p-2",item.bg)}>
                      <item.logo className={cn("",item.color)} />
                    </div>
                    <h4 className="p-2">{item.title}</h4>
                  </div>
                  <div>
                    <ArrowRight className='w-5 h-5'/>
                  </div>
                </div>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default DashBoardPage