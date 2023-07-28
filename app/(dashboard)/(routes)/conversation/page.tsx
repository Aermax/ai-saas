"use client"

import React, { useState,useEffect } from 'react'
import axios from "axios"
import Header from '@/components/Header'
import { Loader, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from './constants'
import { zodResolver } from "@hookform/resolvers/zod"
import { ChatCompletionRequestMessage } from "openai"

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem } 
from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Chat from '@/components/Chat'
import Image from 'next/image'
import { useProModal } from '@/hooks/use-pro-modal'

type Message = {
  query: string
  content: string
}

const arrayToSentence = (arr: Array<string>): string => arr.join(" ")


const ConversationPage = () => {

  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const proModal = useProModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading =  form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {

      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [response.data, userMessage, ...current]);
      
     //const response = await axios.post('/api/conversation', { messages: values.prompt });
      //setMessages((current) => [...current, userMessage, response.data]);
      //console.log(response.data)
      
      form.reset()
    } catch (error: any) {
      if(error?.response?.status === 403){
        proModal.onOpen()
      }
    }finally{
      router.refresh()

    }
  }



  return (
    <div>
      <Header 
        title="Conversation"
        content="Our most Advanced Language Model"
        icon={MessageSquare}
        color="text-purple-500"
        bg="bg-purple-500/10"
        
      />
      <div className="px-4 lg:px-8 mt-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        autoComplete='off'
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How do I calculate the radius of a circle?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>

      </div>
      <div>
        {
          !isLoading && messages.length === 0 && <div className="m-8 flex items-center justify-center flex-col">
          <Image 
            src='/graphic.jpg'
            alt='Graphic'
            width='500'
            height='500'
            
          />
          <p className='text-muted-foreground'>No recent Conversations</p>
        </div>
        }
      </div>
      <div>
      {
        isLoading && <div className="mt-2 ml-4 md:mx-8 p-9 gap-2 flex items-center justify-center 
        pl-4  mr-4 rounded-md bg-muted
        ">
          <Loader className="animate-spin"/>
          <p className='text-muted-foreground'>Generating...</p>
        </div>
      }
      </div>
      <div className='mx-0 md:mx-4 h-full pb-2'>
        {messages?.map((message,index)=>{
          return (
            <Chat
              key={index}
              content={message.content!}
              role={message.role}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ConversationPage