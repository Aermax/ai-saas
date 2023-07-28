import React from 'react'
import { cn } from '@/lib/utils'
import { UserAvatar } from './user-avatar'
import { BotAvatar } from './bot-avatar'


interface ChatProps {
    query: string
    content: string
    
}

const ChatNew = ({query, content} : ChatProps) => {
  return (
    <div>
        <div className='flex m-4 gap-4 pl-4 p-4 mr-4 items-center rounded-md bg-muted'>
            <BotAvatar />
            <p >{content}</p>
        </div>
        
        <div className='flex m-4 gap-4 pl-4 p-4 mr-4 items-center rounded-md bg-white dark:bg-muted-foreground border'>
            <UserAvatar />
            <p >{query}</p>
        </div>

    </div>
  )
}

export default ChatNew