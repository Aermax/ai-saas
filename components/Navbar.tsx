import React from 'react'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { ModeToggle } from './theme-toggle'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  return (
    <div className="flex m-4 gap-2 justify-between">
      <MobileSideBar apiLimitCount={apiLimitCount}/>
      <div className="">
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar