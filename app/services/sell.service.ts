import CustomerNotFoundException from '#exceptions/customer-not-found'
import ProductNotFoundException from '#exceptions/product-not-found'
import Customer from '../entities/customer.js'
import Product from '../entities/product.js'
import Sell from '../entities/sell.js'
import { CreateSellDto } from '../types/create-sell.js'

export class SellService {
  async store(dto: CreateSellDto) {
    const [product, customer] = await Promise.all([
      Product.find(dto.productId),
      Customer.find(dto.customerId),
    ])
    if (!product) throw new ProductNotFoundException()
    if (!customer) throw new CustomerNotFoundException()
    const sell = new Sell()
    sell.productId = dto.productId
    sell.customerId = dto.customerId
    sell.quantity = dto.quantity
    sell.total = dto.total
    return await sell.save()
  }
}
