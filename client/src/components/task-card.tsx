'use client'

import Link from 'next/link'
import { Dot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Task } from '@/types/task'
import { cn, formatTimeAgo } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import ManageTask from './manage-task'

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className='w-full border-none'>
      <CardHeader className='flex items-center justify-between'>
        <Link href={`/tasks/${task.id}`}>
          <CardTitle className='line-clamp-2'>{task.title}</CardTitle>
        </Link>
        <ManageTask task={task} />
      </CardHeader>
      <CardContent>
        <Link href={`/tasks/${task.id}`}>
          <article className='text-muted-foreground line-clamp-3 text-sm'>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {task.description}
            </ReactMarkdown>
          </article>
        </Link>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
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
      </CardFooter>
    </Card>
  )
}

export default TaskCard
