import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import { CustomerService } from '#services/customer.service'
import { CreateCustomerDto } from '../types/create-customer.js'
import { createCustomerValidator } from '#validators/create-customer'
import { UpdateCustomerDto } from '../types/update-customer.js'
import { updateCustomerValidator } from '#validators/update-customer'
import logger from '@adonisjs/core/services/logger'

export default class CustomerController {
  private readonly customerService = new CustomerService()

  async store({ request, response }: HttpContext) {
    const validatedData = (await request.validateUsing(
      createCustomerValidator
    )) as CreateCustomerDto
    logger.log('info', 'Creating customer with data: %j', validatedData)
    const customer = await this.customerService.createCustomer(validatedData)
    logger.log('info', 'Customer created with data: %j', customer)
    return response.status(StatusCodes.CREATED).json(customer)
  }

  async index({ response }: HttpContext) {
    const customers = await this.customerService.index()
    return response.status(StatusCodes.OK).json(customers)
  }

  async show({ params, response, request }: HttpContext) {
    const customer = await this.customerService.findById(params.id, {
      date: request.input('date'),
    })
    return response.status(StatusCodes.OK).json(customer)
  }

  async delete({ params, response }: HttpContext) {
    await this.customerService.delete(params.id)
    return response.status(StatusCodes.NO_CONTENT)
  }

  async update({ params, request, response }: HttpContext) {
    const validatedData = (await request.validateUsing(
      updateCustomerValidator
    )) as UpdateCustomerDto
    await this.customerService.update(params.id, validatedData)
    return response.status(StatusCodes.NO_CONTENT)
  }
}
