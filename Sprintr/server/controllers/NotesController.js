import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
export class notesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.getAll({ creatorId: req.userInfo.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await notesService.destroy(req.params.id)
      res.send({ message: 'successfully deleted note' })
    } catch (error) {
      next(error)
    }
  }
}
