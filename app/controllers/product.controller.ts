import { ProductService } from '#services/product.service'
import { createProductValidator } from '#validators/create-product'
import { HttpContext } from '@adonisjs/core/http'
import { CreateProductDto } from '../types/create-product.js'
import { StatusCodes } from 'http-status-codes'
import { UpdateProductDto } from '../types/update-product.js'
import { updateProductValidator } from '#validators/update-product'

export default class ProductController {
  private readonly productService = new ProductService()

  async store({ request, response }: HttpContext) {
    const validatedData = (await request.validateUsing(createProductValidator)) as CreateProductDto
    const product = await this.productService.store(validatedData)
    return response.status(StatusCodes.OK).json(product)
  }

  async delete({ params, response }: HttpContext) {
    await this.productService.delete(params.id)
    return response.status(StatusCodes.OK)
  }

  async show({ params, response }: HttpContext) {
    const product = await this.productService.show(params.id)
    return response.status(StatusCodes.OK).json(product)
  }

  async update({ request, params, response }: HttpContext) {
    const validatedData = (await request.validateUsing(updateProductValidator)) as UpdateProductDto
    const product = await this.productService.update(params.id, validatedData)
    return response.status(StatusCodes.OK).json(product)
  }

  async index({ response }: HttpContext) {
    const products = await this.productService.index()
    return response.status(StatusCodes.OK).json(products)
  }
}
