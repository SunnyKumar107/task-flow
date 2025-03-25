'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <section className='flex h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4 py-12 lg:py-20'>
      <h2 className='text-foreground text-center text-3xl font-semibold'>
        Page Not Found
      </h2>
      <Button onClick={() => router.back()}>Go Back</Button>
    </section>
  )
}
