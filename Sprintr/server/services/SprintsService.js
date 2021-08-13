import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class SprintsService {
  async getProjectSprints(id) {
    const sprints = await dbContext.Sprints.find(id).populate('project', 'name')
    return sprints
  }

  async create(body) {
    const sprint = await dbContext.Sprints.create(body)
    return sprint
  }

  async update(body) {
    const sprint = await dbContext.Sprints.findByIdAndUpdate(body.id, body, { new: true })
    if (!sprint) {
      throw new BadRequest('Sprint not found')
    }
    return sprint
  }

  async destroy(id) {
    const sprint = await dbContext.Sprints.findByIdAndDelete(id)
    await dbContext.Tasks.updateMany({ sprints: id }, { $pull: { sprints: id } })
    if (!sprint) {
      throw new BadRequest('invalid Id')
    }
    return sprint
  }
}

export const sprintsService = new SprintsService()
