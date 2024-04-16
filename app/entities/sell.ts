import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseModel from './base-entity.js'
import Customer from './customer.js'
import Product from './product.js'

export default class Sell extends BaseModel {
  @column()
  declare customerId: string

  @column()
  declare productId: string

  @column()
  declare quantity: number

  @column()
  declare total: number

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
