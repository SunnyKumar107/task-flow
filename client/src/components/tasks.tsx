'use client'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

function Tasks() {
  const [taskType, setTaskType] = useState<string>('All')

  const handleSelectChange = (value: string) => {
    setTaskType(value)
  }

  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-secondary text-2xl font-medium'>Tasks</h1>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={taskType} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='All'>All</SelectItem>
          <SelectItem value='Completed'>Completed</SelectItem>
          <SelectItem value='Not Completed'>Not Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Tasks
