import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Task = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], default: 'pending', required: true },
    weight: { type: Number, default: 1, required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    sprintId: { type: ObjectId, ref: 'Sprint', required: true },
    backlogItemId: { type: ObjectId, ref: 'BacklogItem', required: true }
  }
)
Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Task.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})

Task.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})

Task.virtual('backlogItem', {
  localField: 'backlogItemId',
  ref: 'BacklogItem',
  foreignField: '_id',
  justOne: true
})
