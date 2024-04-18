import { BaseSchema } from '@adonisjs/lucid/schema'
import { readFile } from 'fs/promises'
import path from 'path'

export default class extends BaseSchema {
  protected tableName = 'execute_init_sqls'

  async up() {
    const directory = path.dirname(new URL(import.meta.url).pathname)

    const sqlFilePath = path.join(directory, '../../init.sql')

    const sqlStatements = (await readFile(sqlFilePath, { encoding: 'utf-8' }))
      .trim()
      .split(';')
      .filter((query) => query.trim())

    for (const sql of sqlStatements) {
      if (sql.trim()) {
        await this.db.rawQuery(sql).exec()
      }
    }
  }

  async down() {}
}
