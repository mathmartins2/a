import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class CustomerNotFoundException extends Exception {
  constructor() {
    super('Customer not found', {
      status: StatusCodes.NOT_FOUND,
      code: 'E_CUSTOMER_NOT_FOUND',
    })
  }
}
