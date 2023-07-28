import React from 'react'
import { cn } from '@/lib/utils'
import { UserAvatar } from './user-avatar'
import { BotAvatar } from './bot-avatar'
import ReactMarkdown from 'react-markdown'

interface ChatProps {
    query: string
    content: string
    
}

const CodeComponent = ({query, content} : ChatProps) => {
  return (
    <div>
        <div className='flex m-4 gap-4 pl-4 p-4 mr-4 items-center rounded-md bg-muted'>
            <BotAvatar />
            <ReactMarkdown components={{
                pre: ({ node, ...props }) => (
                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                    <pre {...props} />
                </div>
                ),
                code: ({ node, ...props }) => (
                <code className="bg-black/10 rounded-lg p-1" {...props} />
                )
            }} className="text-sm overflow-hidden leading-7">
                {content || ""}
            </ReactMarkdown>
        </div>
        
        <div className='flex m-4 gap-4 pl-4 p-4 mr-4 items-center rounded-md bg-white border'>
            <UserAvatar />
            <p >{query}</p>
        </div>

    </div>
  )
}

export default CodeComponent


