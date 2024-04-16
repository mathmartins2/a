import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sells'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index()
      table.uuid('customer_id').notNullable().index().references('id').inTable('customers')
      table.uuid('product_id').notNullable().index().references('id').inTable('products')
      table.integer('quantity').notNullable()
      table.decimal('total', 10, 2).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
