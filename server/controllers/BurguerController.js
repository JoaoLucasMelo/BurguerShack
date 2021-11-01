import BaseController from '../utils/BaseController'
import { burguerService } from '../services/BurguerService'
import { logger } from '../utils/Logger'
export class BurguerController extends BaseController {
  constructor() {
    super('api/burguerShack')
    this.router
      .get('', this.getAllBurguers)
      .post('', this.createBurguer)
      .put('/:burguerId', this.editBurguer)
      .delete('/:burguerId/removed', this.removeBurguer)
  }

  async getAllBurguers(req, res, next) {
    try {
      logger.log('Shack controller get all')
      const burguers = await burguerService.getAllBurguers()
      return res.send(burguers)
    } catch (error) {
      next(error)
    }
  }

  async createBurguer(req, res, next) {
    try {
      const burguerData = req.body
      const burguer = await burguerService.createBurguer(burguerData)
      return res.send({ message: 'burguer created', result: burguer })
    } catch (error) {
      next(error)
    }
  }

  async editBurguer(req, res, next) {
    try {
      const id = req.param.burguerId
      const updatedBurguer = req.body
      updatedBurguer.id = id
      const burguer = await burguerService.editBurguer(id, updatedBurguer)
      return res.send({ message: 'burguer edited', results: burguer })
    } catch (error) {
      next(error)
    }
  }

  async removeBurguer(req, res, next) {
    try {
      const id = req.params.burguerId
      const message = await burguerService.deleteBurguer(id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
