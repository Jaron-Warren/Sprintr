import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name email')
    return projects
  }

  async create(body) {
    const project = await dbContext.Projects.create(body)
    return project
  }

  async destroy(id) {
    const project = await dbContext.Projects.findByIdAndDelete(id)
    await dbContext.Tasks.deleteMany({ projectId: id })
    await dbContext.BacklogItems.deleteMany({ projectId: id })
    await dbContext.Sprints.deleteMany({ projectId: id })
    if (!project) {
      throw new BadRequest('invalid Id')
    }
    return project
  }
}

export const projectsService = new ProjectsService()
