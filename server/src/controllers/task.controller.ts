import { NextFunction, Request, Response } from 'express'
import HttpError from '../utils/http-error'
import taskService from '../services/task.service'

async function createNew(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description } = req.body
    const task = await taskService.createTask({ title, description })
    res.status(201).json({ message: 'task created', data: { task } })
  } catch (err) {
    next(err)
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  const type = req.query.type
  try {
    let tasks
    if (type && typeof type === 'string') {
      tasks = await taskService.getAllTasks(type)
    } else {
      tasks = await taskService.getAllTasks()
    }
    res.status(200).json({ message: 'tasks fetched', total: tasks.length, data: { tasks } })
  } catch (err) {
    next(err)
  }
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const task = await taskService.getTaskById(id)

    if (!task) {
      throw new HttpError(404, 'task not found')
    }

    res.status(200).json({ message: 'task fetched', data: { task } })
  } catch (err) {
    next(err)
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const taskToDelete = await taskService.getTaskById(id)

    if (!taskToDelete) {
      throw new HttpError(404, 'task not found')
    }

    const task = await taskService.deleteTaskById(id)
    res.status(200).json({ message: 'task deleted', data: { task } })
  } catch (err) {
    next(err)
  }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { title, description, completed } = req.body

    const taskToUpdate = await taskService.getTaskById(id)

    if (!taskToUpdate) {
      throw new HttpError(404, 'task not found')
    }

    const task = await taskService.updateTaskById(id, { title, description, completed })
    res.status(200).json({ message: 'task updated', data: { task } })
  } catch (err) {
    next(err)
  }
}

export default {
  createNew,
  getAll,
  getOne,
  deleteOne,
  updateOne
}
