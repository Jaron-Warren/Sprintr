import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator', 'name email')
    return tasks
  }

  async getProjectTasks(id) {
    const tasks = await dbContext.Tasks.find(id).populate('project', 'name')
    return tasks
  }

  async getSprintTasks(id) {
    const tasks = await dbContext.Tasks.find(id)
    return tasks
  }

  async create(body) {
    const project = await dbContext.Tasks.create(body)
    return project
  }

  async update(body) {
    const task = await dbContext.Tasks.findByIdAndUpdate(body.id, body, { new: true })
    if (!task) {
      throw new BadRequest('Task not found')
    }
    return task
  }

  async destroy(id) {
    const project = await dbContext.Tasks.findByIdAndDelete(id)
    await dbContext.Notes.deleteMany({ taskId: id })
    if (!project) {
      throw new BadRequest('invalid Id')
    }
    return project
  }
}

export const tasksService = new TasksService()
