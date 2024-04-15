import { UserService } from '#services/user.service'
import { createUserValidator } from '#validators/create-user'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateUserDto } from '../types/create-user.js'
import { StatusCodes } from 'http-status-codes'

export default class UserController {
  private userService = new UserService()

  async index({ response }: HttpContext) {
    return response.json({ message: 'Listagem de usuários' })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const validatedData = (await request.validateUsing(createUserValidator)) as CreateUserDto
    await this.userService.createUser(validatedData)
    return response.status(StatusCodes.OK).json(data)
  }
}
