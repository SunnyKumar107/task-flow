import CreateTaskForm from '@/components/create-task-form'
import Tasks from '@/components/tasks'

export default function Home() {
  return (
    <div className='absolute flex h-full w-full flex-col lg:flex-row-reverse'>
      <div className='bg-background/30 flex-1 px-8 py-6 lg:ml-[576px]'>
        <Tasks />
      </div>
      <div className='bg-background top-24 left-0 h-full md:min-w-xl lg:fixed'>
        <CreateTaskForm />
      </div>
    </div>
  )
}
