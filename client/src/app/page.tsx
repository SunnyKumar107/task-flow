import CreateTaskForm from '@/components/create-task-form'
import Tasks from '@/components/tasks'

export default function Home() {
  return (
    <div className='absolute flex h-full w-full'>
      <div className='bg-background fixed top-24 left-0 h-full md:min-w-xl'>
        <CreateTaskForm />
      </div>
      <div className='bg-background/30 ml-[576px] flex-1 px-8 py-6'>
        <Tasks />
      </div>
    </div>
  )
}
