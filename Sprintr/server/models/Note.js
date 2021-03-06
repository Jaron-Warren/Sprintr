import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Note = new Schema(
  {
    description: { type: String, required: true },
    taskId: { type: ObjectId, ref: 'Task' },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  }
)
Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Note.virtual('task', {
  localField: 'taskId',
  ref: 'Task',
  foreignField: '_id',
  justOne: true
})
