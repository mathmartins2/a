import { column } from '@adonisjs/lucid/orm'
import BaseModel from './base-entity.js'
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class Product extends compose(BaseModel, SoftDeletes) {
  @column()
  declare name: string

  @column()
  declare price: string

  @column()
  declare quantity: number

  @column.dateTime()
  declare deletedAt: DateTime | null
}
