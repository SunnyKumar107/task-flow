import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

import { TaskProvider } from '@/providers/task-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: { template: '%s | Task Flow', default: 'Home | Task Flow' }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <Header />
            <div className='mt-24 min-h-[calc(100vh-96px)]'>{children}</div>
            <Toaster />
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
