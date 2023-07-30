import React from 'react'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { ModeToggle } from './theme-toggle'
import { Badge } from './ui/badge'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
  return (
    <div className="flex m-4 gap-2 justify-between items-center">
      <MobileSideBar apiLimitCount={apiLimitCount}/>
      <div className="">
            <ModeToggle/>
      </div>
      {isPro && <div>
      <Badge variant='premium'>Pro</Badge>
      </div>}
    </div>
  )
}

export default Navbar