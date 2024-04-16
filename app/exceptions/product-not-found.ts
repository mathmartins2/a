import { Exception } from '@adonisjs/core/exceptions'
import { StatusCodes } from 'http-status-codes'

export default class ProductNotFoundException extends Exception {
  constructor() {
    super('Product not found', {
      status: StatusCodes.NOT_FOUND,
      code: 'E_PRODUCT_NOT_FOUND',
    })
  }
}
