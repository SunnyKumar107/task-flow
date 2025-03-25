import { TaskForm } from '@/validators/task-schema'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createTask(task: TaskForm) {
  console.log('api', API_URL)
  console.log(task)
  const res = await axios.post(`${API_URL}/tasks`, task)
  return res.data
}
