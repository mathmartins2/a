import { column, hasMany } from '@adonisjs/lucid/orm'
import BaseModel from './base-entity.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sell from './sell.js'

export default class Customer extends BaseModel {
  @column()
  declare fullName: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @hasMany(() => Sell)
  declare sales: HasMany<typeof Sell>
}
