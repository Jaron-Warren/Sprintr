import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAll(projectid) {
    const res = await api.get('api/tasks')
    AppState.tasks = res.data
  }

  async createTask(rawtask) {
    await api.post('api/tasks', rawtask)
    await this.getAll()
  }

  async destroyTask(id) {
    await api.delete('api/tasks' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }

  async changeTaskStatus(id, value) {
    const res = await api.put('api/tasks' + id, value)
  }
}

export const tasksService = new TasksService()
