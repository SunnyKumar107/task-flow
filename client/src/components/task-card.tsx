'use client'

import React, { useContext, useState } from 'react'
import { TasksContext } from '@/providers/task-provider'
import { deleteTask, updateTask } from '@/services/task-service'
import { CheckCheck, Dot, Ellipsis, Loader2Icon, Trash2 } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function TaskCard({ task }: { task: Task }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { tasks, setTasks } = useContext(TasksContext)

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true)
      const res = await deleteTask(task.id)
      setTasks(tasks.filter(task => task.id !== res.data.task.id))
      //toast
    } catch (error) {
      console.log('err', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdateTask = async () => {
    try {
      setIsUpdating(true)
      const res = await updateTask(task.id, { completed: !task.completed })

      setTasks(
        tasks.map(task => (task.id === res.data.task.id ? res.data.task : task))
      )
      //toast
    } catch (error) {
      //toast
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className='w-full border-none'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='cursor-pointer outline-none'>
              <Ellipsis className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0' />
              <span className='sr-only'>Toggle task menu</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='p-2'>
            <button
              className='mb-1 flex cursor-pointer items-center gap-2 text-sm'
              onClick={handleUpdateTask}
            >
              {isUpdating ? (
                <>
                  <Loader2Icon
                    size={16}
                    className='text-primary h-4 w-4 animate-spin'
                  />{' '}
                  Updating...
                </>
              ) : (
                <>
                  <CheckCheck
                    size={16}
                    className={
                      task.completed ? 'text-foreground/30' : 'text-[#2e9100]'
                    }
                  />{' '}
                  {task.completed ? 'Uncomplete' : 'Complete'}
                </>
              )}
            </button>
            <button
              className='flex cursor-pointer items-center gap-2 text-sm'
              onClick={handleDeleteTask}
            >
              {isDeleting ? (
                <>
                  <Loader2Icon
                    size={16}
                    className='text-destructive h-4 w-4 animate-spin'
                  />{' '}
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} className='text-destructive' /> Delete
                </>
              )}
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <article className='text-muted-foreground line-clamp-3 text-sm'>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {task.description}
          </ReactMarkdown>
        </article>
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
