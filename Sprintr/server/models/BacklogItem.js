import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const BacklogItem = new Schema(
  {
    name: { type: String, required: true },
    isOpen: { type: Boolean, required: true, default: false },
    projectId: { type: ObjectId, ref: 'Project' },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  }
)
BacklogItem.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

BacklogItem.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
