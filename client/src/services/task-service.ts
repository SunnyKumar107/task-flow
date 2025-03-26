import { TaskForm } from '@/validators/task-schema'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createTask(task: TaskForm) {
  const res = await axios.post(`${API_URL}/tasks`, task)
  return res.data.data.task
}

export async function getTasks(type?: 'all' | 'completed' | 'not-completed') {
  const res = await axios.get(`${API_URL}/tasks?type=${type}`)
  return res.data.data.tasks
}

export async function getTask(id: string) {
  const res = await axios.get(`${API_URL}/tasks/${id}`)
  return res.data.data.task
}

export async function deleteTask(id: string) {
  const res = await axios.delete(`${API_URL}/tasks/${id}`)
  return res.data.data.task
}

interface UpdateTask {
  title?: string
  description?: string
  completed?: boolean
}

export async function updateTask(id: string, task: UpdateTask) {
  const res = await axios.put(`${API_URL}/tasks/${id}`, task)
  return res.data.data.task
}
