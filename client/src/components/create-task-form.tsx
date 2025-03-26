'use client'

import dynamic from 'next/dynamic'
import { TaskForm, taskSchema } from '@/validators/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import 'react-quill-new/dist/quill.snow.css'

import { useContext, useState } from 'react'
import { TasksContext } from '@/providers/task-provider'
import { createTask } from '@/services/task-service'

import LoadingButton from './loading-button'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

function CreateTaskForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { tasks, setTasks } = useContext(TasksContext)

  const form = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (task: TaskForm) => {
    try {
      setIsSubmitting(true)
      const createdTask = await createTask(task)

      setTasks([createdTask, ...tasks])
      form.reset({ title: '', description: '' })
      toast.success('Task created successfully!')
      window.scrollTo(0, 0)
    } catch {
      toast.error('Task creation failed!', {
        description: 'Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='px-8'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-8 w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ReactQuill
                    {...field}
                    className='custom-quill bg-input/30 border-input h-[16rem] rounded-lg border'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-12 text-center'>
            <LoadingButton
              type='submit'
              loading={isSubmitting}
              text='Create New Task'
              className='w-full py-5'
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateTaskForm
