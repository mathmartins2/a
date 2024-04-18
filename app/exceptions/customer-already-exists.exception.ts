import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class CustomerAlreadyExistsException extends Exception {
  constructor() {
    super('Customer already exists', {
      status: StatusCodes.CONFLICT,
      code: 'E_CUSTOMER_ALREADY_EXISTS',
    })
  }
}
