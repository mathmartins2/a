import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class UnAuthorizedException extends Exception {
  constructor() {
    super('Unauthorized', {
      status: StatusCodes.UNAUTHORIZED,
      code: 'E_USER_ALREADY_EXISTS',
    })
  }
}
