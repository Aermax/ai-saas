import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import {ModalProvider} from '@/components/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creata',
  description: 'The Ultimate AI tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <link
      rel="icon"
      href="/logoipsum-280.svg"
      type="image/<generated>"
      sizes="<generated>"
    />
        </head>
      <body className={inter.className}>
        <ModalProvider />
        {children}
        </body>
      </html>
    </ClerkProvider>
    
  )
}
