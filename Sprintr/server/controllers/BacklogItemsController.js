import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'
import BaseController from '../utils/BaseController'
export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/backlogItems')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getAll({ creatorId: req.userInfo.id })
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.create(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await backlogItemsService.destroy(req.params.id)
      res.send({ message: 'successfully deleted backlogItem' })
    } catch (error) {
      next(error)
    }
  }
}
