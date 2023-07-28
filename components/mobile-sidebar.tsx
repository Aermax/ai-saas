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
import { getApiLimitCount } from '@/lib/api-limit'



const MobileSideBar = ({apiLimitCount}: {apiLimitCount: number}) => {

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
              <Sidebar  isPro={false} apiLimitCount={apiLimitCount} />
          </SheetContent>
          
        </Sheet>
        

  )
}

export default MobileSideBar