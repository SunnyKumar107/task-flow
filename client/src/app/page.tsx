import CreateTaskForm from '@/components/create-task-form'
import Tasks from '@/components/tasks'

export default function Home() {
  return (
    <div className='flex min-h-[calc(100vh-96px)] w-full'>
      <div className='h-full w-1/2'>
        <CreateTaskForm />
      </div>
      <div className='bg-background/10 border-foreground/30 flex-1 border-l px-8 py-6'>
        <Tasks />
      </div>
    </div>
  )
}
