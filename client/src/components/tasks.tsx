'use client'

import { useContext, useEffect, useState } from 'react'
import { TasksContext } from '@/providers/task-provider'
import { getTasks } from '@/services/task-service'
import { toast } from 'sonner'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import Loader from './loader'
import TaskCard from './task-card'

function Tasks() {
  const [taskType, setTaskType] = useState<string>('All')
  const [isLoading, setIsLoading] = useState(false)
  const { tasks, setTasks } = useContext(TasksContext)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const tasks = await getTasks()
        setTasks(tasks)
      } catch (error) {
        toast.error('Failed to fetch tasks!', {
          description: 'Please try again.'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleSelectChange = async (value: string) => {
    setTaskType(value)

    try {
      setIsLoading(true)
      if (value === 'Completed') {
        const tasks = await getTasks('completed')
        setTasks(tasks)
      } else if (value === 'Not Completed') {
        const tasks = await getTasks('not-completed')
        setTasks(tasks)
      } else {
        const tasks = await getTasks()
        setTasks(tasks)
      }
    } catch (error) {
      toast.error('Failed to fetch tasks!', {
        description: 'Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-secondary text-2xl font-medium'>Tasks</h1>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className='w-[160px] cursor-pointer'>
            <SelectValue placeholder={taskType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='cursor-pointer' value='All'>
              All
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Completed'>
              Completed
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Not Completed'>
              Not Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Loader size='md' />
      ) : (
        <div className='mt-8 flex flex-col items-center gap-3'>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks
