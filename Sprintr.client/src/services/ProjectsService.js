import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class ProjectsService {
  async getAll(query = {}) {
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log(res.data)
    AppState.projects = res.data
  }

  async createProject(rawProject) {
    const res = await api.post('api/projects', rawProject)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects.filter(p => p.id !== id)
  }
}

export const projectsService = new ProjectsService()
