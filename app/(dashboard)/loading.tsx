import React from 'react'
import { Loader2 } from 'lucide-react'

const loading = () => {
  return (
    <div 
    className='
      flex 
      justify-center 
      items-center 
      animate-spin
      mt-72
      text-3xl
      overflow-hidden
      '>
      <Loader2 size={48} />
    </div>
  )
}

export default loading