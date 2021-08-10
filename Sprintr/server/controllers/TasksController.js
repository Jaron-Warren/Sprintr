import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:id/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.getAll({ creatorId: req.userInfo.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await tasksService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await tasksService.destroy(req.params.id)
      res.send({ message: 'successfully deleted project' })
    } catch (error) {
      next(error)
    }
  }
}
