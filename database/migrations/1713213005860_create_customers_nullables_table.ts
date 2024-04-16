import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('phone').nullable().alter()
      table.string('address').nullable().alter()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
