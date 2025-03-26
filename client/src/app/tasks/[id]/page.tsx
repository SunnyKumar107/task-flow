import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTask } from '@/services/task-service'
import { Dot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Task } from '@/types/task'
import { cn, formatTimeAgo } from '@/lib/utils'
import ManageTask from '@/components/manage-task'

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const task: Task | null = await getTask(id)

  return {
    title: task?.title || 'Task'
  }
}

interface TaskDetailsProps {
  params: Promise<{ id: string }>
}

export default async function page({ params }: TaskDetailsProps) {
  const { id } = await params
  const task: Task | null = await getTask(id)

  if (!task) redirect('/')
  return (
    <div className='flex min-h-[calc(100vh-6rem)] justify-center'>
      <div className='flex w-full max-w-2xl flex-col px-4 py-10 md:px-10'>
        <div className='flex items-center justify-between gap-2'>
          <h1 className='text-foreground text-4xl font-bold'>{task.title}</h1>
          <ManageTask task={task} />
        </div>
        <div className='mt-2 flex items-center gap-2'>
          <div
            className={cn(
              'flex items-center text-sm font-semibold text-[#2e9100]',
              {
                'text-destructive': !task.completed
              }
            )}
          >
            <Dot size={24} />
            {task.completed ? 'Completed' : 'Not completed'}
          </div>
          <div className='flex items-center text-sm'>
            <Dot size={24} className='text-foreground' />
            {formatTimeAgo(new Date(task.createdAt))}
          </div>
        </div>
        <article className='text-foreground/80 mt-8 font-medium'>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {task.description}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
