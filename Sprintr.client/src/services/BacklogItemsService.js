import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class BacklogItemsService {
  async getAll(query = {}) {
    const res = await api.get('api/backlogItems' + convertToQuery(query))
    // logger.log(res.data)
    AppState.backlogItems = res.data
  }

  async getById(id) {
    const res = await api.get('api/backlogItems/' + id)
    // logger.log('From backlogs', res.data)
    AppState.activeBacklogItem = res.data
  }

  async createBacklogItem(rawbacklogItem) {
    const res = await api.post('api/backlogItems', rawbacklogItem)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/backlogItems/' + id)
    AppState.backlogItems = AppState.backlogItems.filter(i => i.id !== id)
    await this.getAll()
  }
}

export const backlogItemsService = new BacklogItemsService()
