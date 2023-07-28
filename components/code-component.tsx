import React from 'react'
import { cn } from '@/lib/utils'
import { UserAvatar } from './user-avatar'
import { BotAvatar } from './bot-avatar'
import ReactMarkdown from 'react-markdown'

interface ChatProps {
    role: string
    content: string
    
}

const CodeComponent = ({role, content} : ChatProps) => {
  return (
    <div 
    className={cn(
      "p-8  flex items-start gap-x-8 rounded-lg mt-4 md:m-4 m-4 overflow-hidden",
      role === "user" ? "bg-white dark:bg-muted-foreground border border-black/10" : "bg-muted",
    )}
  >
    {role === "user" ? <UserAvatar /> : <BotAvatar />}
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
  )
}

export default CodeComponent


