"use client"

import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { 
    Sheet,
    SheetContent, 
    SheetTrigger 
} from '@/components/ui/sheet'
import {Sidebar} from '@/components/SideBar'



const MobileSideBar = (
  {apiLimitCount,
  isPro}: 
  {
    apiLimitCount: number,
    isPro: boolean
  }) => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }


  return (

        <Sheet>
          <SheetTrigger>
            <Button 
              variant="ghost"
              size="icon"
              className='md:hidden'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0" side="left">
              <Sidebar  isPro={isPro} apiLimitCount={apiLimitCount} />
          </SheetContent>
          
        </Sheet>
        

  )
}

export default MobileSideBar