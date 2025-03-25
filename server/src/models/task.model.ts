import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
  id: string
  title: string
  description: string
  completed: boolean
}

const taskSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

taskSchema.set('toJSON', {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

const Task = mongoose.model<ITask>('Task', taskSchema)
export default Task
