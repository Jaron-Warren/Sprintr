import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator', 'name email')
    return tasks
  }

  async getProjecttasks(id) {
    const tasks = await dbContext.Tasks.find(id).populate('project', 'name')
    return tasks
  }

  async create(body) {
    const project = await dbContext.Tasks.create(body)
    return project
  }

  async destroy(id) {
    const project = await dbContext.Tasks.findByIdAndDelete(id)
    if (!project) {
      throw new BadRequest('invalid Id')
    }
    return project
  }
}

export const tasksService = new TasksService()
