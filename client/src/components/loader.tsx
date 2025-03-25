import { Loader2Icon } from 'lucide-react'

export default function Loader() {
  return (
    <section className='flex h-[calc(100vh-6rem)] items-center justify-center'>
      <Loader2Icon className='text-secondary h-10 w-10 animate-spin' />
    </section>
  )
}
