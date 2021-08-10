import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprints.find(query).populate('creator', 'name email')
    return sprints
  }

  async getProjectSprints(id) {
    const sprints = await dbContext.Sprints.find(id).populate('project', 'name')
    return sprints
  }

  async create(body) {
    const sprint = await dbContext.Sprints.create(body)
    return sprint
  }

  async destroy(id) {
    const sprint = await dbContext.Sprints.findByIdAndDelete(id)
    if (!sprint) {
      throw new BadRequest('invalid Id')
    }
    return sprint
  }
}

export const sprintsService = new SprintsService()
