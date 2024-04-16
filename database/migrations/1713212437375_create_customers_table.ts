import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index()
      table.string('full_name').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('email').notNullable()
      table.string('phone').notNullable()
      table.string('address').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
