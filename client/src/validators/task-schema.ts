import { z } from 'zod'

const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, {
      message: `${fieldName} is required`
    })

export const taskSchema = z.object({
  title: requiredString('Title').default(''),
  description: requiredString('Description').default('')
})

export type TaskForm = z.infer<typeof taskSchema>
