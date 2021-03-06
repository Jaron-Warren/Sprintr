import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getSprintTasks)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getById(req, res, next) {
    try {
      const sprints = await sprintsService.getProjectSprints({ projectId: req.params.id })
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getSprintTasks(req, res, next) {
    try {
      const tasks = await tasksService.getSprintTasks({ sprintId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await sprintsService.destroy(req.params.id)
      res.send({ message: 'successfully deleted sprint' })
    } catch (error) {
      next(error)
    }
  }
}
