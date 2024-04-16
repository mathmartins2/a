import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class UserAlreadyExistsException extends Exception {
  constructor() {
    super('User already exists', {
      status: StatusCodes.CONFLICT,
      code: 'E_USER_ALREADY_EXISTS',
    })
  }
}
