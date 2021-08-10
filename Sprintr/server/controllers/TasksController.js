import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
export class TasksController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/notes', this.getTaskNotes)
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

  async getTaskNotes(req, res, next) {
    try {
      const notes = await notesService.getTaskNotes({ projectId: req.params.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await tasksService.destroy(req.params.id)
      res.send({ message: 'successfully deleted task' })
    } catch (error) {
      next(error)
    }
  }
}
