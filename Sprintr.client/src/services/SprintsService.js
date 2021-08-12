import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getAll(id) {
    const res = await api.get('api/sprints/' + id + '/tasks')
    logger.log(res.data)
    AppState.tasks[id] = res.data
  }
}

export const sprintsService = new SprintsService()
