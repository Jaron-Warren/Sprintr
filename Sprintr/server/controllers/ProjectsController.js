import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/sprints', this.getProjectSprints)
      .get('/:id/backlogItems', this.getProjectBacklogItems)
      .get('/:id/tasks', this.getProjectTasks)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll({ creatorId: req.userInfo.id })
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getProjectSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getProjectSprints({ projectId: req.params.id })
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getProjectBacklogItems(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getProjectbacklogItems({ projectId: req.params.id })
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getProjectTasks(req, res, next) {
    try {
      const tasks = await tasksService.getProjecttasks({ projectId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await projectsService.destroy(req.params.id)
      res.send({ message: 'successfully deleted project' })
    } catch (error) {
      next(error)
    }
  }
}
