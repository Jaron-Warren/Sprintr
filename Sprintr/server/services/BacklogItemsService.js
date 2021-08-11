import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BacklogItemsService {
  async getAll(query = {}) {
    const backLogItems = await dbContext.BacklogItems.find(query).populate('creator', 'name email')
    return backLogItems
  }

  async getProjectbacklogItems(id) {
    const backlogItems = await dbContext.BacklogItems.find(id).populate('project', 'name')
    return backlogItems
  }

  async create(body) {
    const backlogItem = await dbContext.BacklogItems.create(body)
    return backlogItem
  }

  async update(body) {
    const backlogItem = await dbContext.BacklogItems.findByIdAndUpdate(body.id, body, { new: true })
    if (!backlogItem) {
      throw new BadRequest('Backlog Item not found')
    }
    return backlogItem
  }

  async destroy(id) {
    const backlogItem = await dbContext.BacklogItems.findByIdAndDelete(id)
    await dbContext.Tasks.deleteMany({ backlogItemId: id })
    if (!backlogItem) {
      throw new BadRequest('invalid Id')
    }
    return backlogItem
  }
}

export const backlogItemsService = new BacklogItemsService()
