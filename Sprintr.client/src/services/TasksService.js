import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async destroyTask(id) {
    await api.delete('api/tasks' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }

  async changeTaskStatus(id, value) {
    const res = await api.put('api/tasks' + id, value)
  }
}

export const tasksService = new TasksService()
