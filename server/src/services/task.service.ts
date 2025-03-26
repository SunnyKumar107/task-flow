import Task from '../models/task.model'
import { TaskData } from '../types/task'

async function createTask(task: TaskData) {
  return await Task.create(task)
}

async function getAllTasks(type?: string) {
  if (type && type === 'completed') {
    return await Task.find({ completed: true }).sort({ createdAt: -1 })
  }

  if (type && type === 'not-completed') {
    return await Task.find({ completed: false }).sort({ createdAt: -1 })
  }
  return await Task.find().sort({ createdAt: -1 })
}

async function getTaskById(id: string) {
  return await Task.findById(id)
}

async function deleteTaskById(id: string) {
  return await Task.findByIdAndDelete(id)
}

async function updateTaskById(id: string, task: TaskData) {
  return await Task.findByIdAndUpdate(id, task, { new: true })
}

export default {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById
}
