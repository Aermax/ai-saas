import { LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
    title: string,
    content: string,
    icon: LucideIcon,
    color?: string,
    bg?: string
}

const Header = ({
    title,
    content,
    icon: Icon,
    color, 
    bg
} : HeaderProps) => {
    
  return (
    <div className="flex gap-2 ml-8">
        <div className={cn("rounded-md h-12 w-12 flex justify-center items-center", bg)}>
            <Icon className={cn("", color)}/>
        </div>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{content}</p>
        </div>
    </div>
  )
}

export default Header