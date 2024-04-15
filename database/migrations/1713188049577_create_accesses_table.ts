import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AuthAccessTokensSchema extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('tokenable_id').notNullable().alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('tokenable_id').alter()

      table.dropColumn('tokenable_type')
    })
  }
}
