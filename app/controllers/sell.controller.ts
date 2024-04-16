import { SellService } from '#services/sell.service'
import { createSellValidator } from '#validators/create-sell'
import { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import { CreateSellDto } from '../types/create-sell.js'

export default class SellController {
  private readonly sellService = new SellService()

  async store({ request, response }: HttpContext) {
    const validatedData = (await request.validateUsing(createSellValidator)) as CreateSellDto
    const sell = await this.sellService.store(validatedData)
    return response.status(StatusCodes.OK).json(sell)
  }
}
