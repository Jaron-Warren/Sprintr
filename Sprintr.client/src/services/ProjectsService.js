import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'
import { router } from '../router'

class ProjectsService {
  async getAll(query = {}) {
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log(res.data)
    AppState.projects = res.data
  }

  async getById(id) {
    const res = await api.get('api/projects/' + id)
    // logger.log(res.data)
    AppState.activeProject = res.data
  }

  async createProject(rawProject) {
    const res = await api.post('api/projects', rawProject)
    await this.getAll()
    return res.data.id
  }

  async destroy(id) {
    if (window.confirm('Are you sure you want to delete the project?')) {
      await api.delete('api/projects/' + id)
      router.push({ name: 'Home' })
    }
    AppState.projects = AppState.projects.filter(p => p.id !== id)
  }
}

export const projectsService = new ProjectsService()
