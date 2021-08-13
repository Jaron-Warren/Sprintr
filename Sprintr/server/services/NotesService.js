import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async getTaskNotes(id) {
    const notes = await dbContext.Notes.find(id).populate('task', 'name')
    return notes
  }

  async create(body) {
    const project = await dbContext.Notes.create(body)
    return project
  }

  async destroy(id) {
    const project = await dbContext.Notes.findByIdAndDelete(id)
    if (!project) {
      throw new BadRequest('invalid Id')
    }
    return project
  }
}

export const notesService = new NotesService()
