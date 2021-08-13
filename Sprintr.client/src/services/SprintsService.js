import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getAll(id) {
    const res = await api.get('api/sprints/' + id)
    logger.log(res.data)
    AppState.sprints = res.data
  }

  async createSprint(rawsprint) {
    await api.post('api/sprints/', rawsprint)
  }

  async destroySprint(id) {
    await api.delete('api/sprints/' + id)
    AppState.sprints = AppState.sprints.filter(t => t.id !== id)
  }
}
export const sprintsService = new SprintsService()
