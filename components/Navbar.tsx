import React from 'react'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  return (
    <div>
      <MobileSideBar apiLimitCount={apiLimitCount}/>
    </div>
  )
}

export default Navbar