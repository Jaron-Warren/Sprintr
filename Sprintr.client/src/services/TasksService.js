import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async getProjectTasks(projectid) {
    const res = await api.get('api/tasks')
    logger.log(res.data)
    AppState.tasks = res.data
  }

  async createTask(rawtask) {
    await api.post('api/tasks/', rawtask)
  }

  async createNote(rawNote) {
    await api.post('api/notes', rawNote)
    logger.log(AppState.notes)
  }

  async getAllNotes() {
    const res = await api.get('api/notes')
    AppState.notes = res.data
  }

  async destroyTask(id) {
    await api.delete('api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }

  async updateTask(id, task) {
    const res = await api.put('api/tasks/' + id, task)
  }
}

export const tasksService = new TasksService()
