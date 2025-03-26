'use client'

import { useContext, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TasksContext } from '@/providers/task-provider'
import { deleteTask, updateTask } from '@/services/task-service'
import { CheckCheck, Ellipsis, Loader2Icon, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Task } from '@/types/task'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function ManageTask({ task }: { task: Task }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { tasks, setTasks } = useContext(TasksContext)
  const pathname = usePathname()
  const router = useRouter()

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true)
      const deletedTask = await deleteTask(task.id)
      setTasks(tasks.filter(task => task.id !== deletedTask.id))
      toast.success('Task deleted successfully!')

      if (pathname.startsWith('/tasks')) {
        router.push('/')
      }
    } catch {
      toast.error('Task deletion failed!', {
        description: 'Please try again.'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdateTask = async () => {
    try {
      setIsUpdating(true)
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed
      })

      setTasks(
        tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      )
      toast.success('Task updated successfully!')
    } catch {
      toast.error('Task update failed!', {
        description: 'Please try again.'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='cursor-pointer outline-none'>
          <Ellipsis className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0' />
          <span className='sr-only'>Toggle task menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2'>
        <button
          className='mb-1 flex cursor-pointer items-center gap-2 text-sm outline-none'
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
          className='flex cursor-pointer items-center gap-2 text-sm outline-none'
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
  )
}

export default ManageTask
