import { UserService } from '#services/user.service'
import { createUserValidator } from '#validators/create-user'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateUserDto } from '../types/create-user.js'
import { StatusCodes } from 'http-status-codes'
import { loginValidator } from '#validators/login'
import { LoginDto } from '../types/login.js'

export default class UserController {
  private readonly userService = new UserService()

  async store({ request, response }: HttpContext) {
    const validatedData = (await request.validateUsing(createUserValidator)) as CreateUserDto
    const user = await this.userService.createUser(validatedData)
    return response.status(StatusCodes.OK).json(user)
  }

  async login({ request }: HttpContext) {
    const validatedData = (await request.validateUsing(loginValidator)) as LoginDto
    const user = await this.userService.login(validatedData.email, validatedData.password)
    return user
  }
}
