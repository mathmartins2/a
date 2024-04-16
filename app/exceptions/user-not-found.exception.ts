import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class UserNotFoundException extends Exception {
  constructor() {
    super('User not found', {
      status: StatusCodes.NOT_FOUND,
      code: 'E_USER_NOT_FOUND',
    })
  }
}
