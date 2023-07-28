"use client"

import React, { useState } from 'react'
import axios from "axios"
import Header from '@/components/Header'
import { Download, ImageIcon, Loader} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { 
  amountOptions, 
  formSchema, 
  resolutionOptions 
} from './constants'
import { zodResolver } from "@hookform/resolvers/zod"

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem } 
from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectValue,
  SelectTrigger 
} from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import { useProModal } from '@/hooks/use-pro-modal'


type Message = {
  query: string
  content: string
}

const ImagePage = () => {

  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const proModal = useProModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  })

  const isLoading =  form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      const response = await axios.post('/api/image/', {
        "prompt": values.prompt,
        "amount": values.amount,
        "resolution": values.resolution
      })
      
      const urls = response.data.map((image: {url: string})=> image.url)

      setImages(urls)
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
    <div className='pb-8'>
      <Header 
        title="Image Generation"
        content="Our most Advanced Text to Image Model"
        icon={ImageIcon}
        color="text-emerald-500"
        bg="bg-emerald-500/10"
        
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        autoComplete='off'
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="An Astronaut in Ocean" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          !isLoading && images.length === 0 && <div className="m-8 flex items-center justify-center flex-col">
          <Image 
            src='/graphic.jpg'
            alt='Graphic'
            width='500'
            height='500'
            
          />
          <p className='text-muted-foreground'>No Images Generated yet!</p>
        </div>
        }
      </div>
      <div>
      {
        isLoading && <div className="mt-2 mx-0 md:mx-8 p-9 gap-2 flex items-center justify-center 
        pl-4  mr-4 rounded-md bg-muted
        ">
          <Loader className="animate-spin"/>
          <p className='text-muted-foreground'>Generating...</p>
        </div>
      }
      </div>
      <div className="mx-4 lg:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default ImagePage