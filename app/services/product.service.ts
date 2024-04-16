import ProductNotFoundException from '#exceptions/product-not-found'
import Product from '../entities/product.js'
import { CreateProductDto } from '../types/create-product.js'
import { UpdateProductDto } from '../types/update-product.js'

export class ProductService {
  async store(dto: CreateProductDto) {
    const product = new Product()
    product.name = dto.name
    product.price = dto.price
    product.quantity = dto.quantity
    return await product.save()
  }

  async index() {
    return await Product.query().select('id', 'name').orderBy('name')
  }

  async show(id: string) {
    return await Product.find(id)
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await Product.find(id)
    if (!product) throw new ProductNotFoundException()
    product.name = dto.name
    product.price = dto.price
    product.quantity = dto.quantity
    return await product.save()
  }

  async delete(id: string) {
    const product = await Product.find(id)
    if (!product) return null
    await product.delete()
  }
}
