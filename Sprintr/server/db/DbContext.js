import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Project as ProjectSchema } from '../models/Project.js'
import { Task as TaskSchema } from '../models/Task'
import { BacklogItem as BacklogItemSchema } from '../models/BacklogItem'
import { Sprint as SprintSchema } from '../models/Sprint'
import { Note as NoteSchema } from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Projects = mongoose.model('Project', ProjectSchema);

  BacklogItems = mongoose.model('BacklogItem', BacklogItemSchema);

  Tasks = mongoose.model('Task', TaskSchema);

  Sprints = mongoose.model('Sprint', SprintSchema);

  Notes = mongoose.model('Note', NoteSchema)
}

export const dbContext = new DbContext()
