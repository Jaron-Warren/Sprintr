import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Project as ProjectSchema } from '../models/Project.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Projects = mongoose.model('Project', ProjectSchema);
}

export const dbContext = new DbContext()
