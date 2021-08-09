import { dbContext } from '../db/DbContext'

class ProjectsService {
  async create(body) {
    const project = await dbContext.Projects.create(body)
    return project
  }

  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name email')
    return projects
  }
}

export const projectsService = new ProjectsService()
