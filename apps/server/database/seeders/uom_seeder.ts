import Uom from '#models/uom'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    await Uom.createMany([
      {
        name: 'cây',
      },
      {
        name: 'cái',
      },
      {
        name: 'kg',
      },
    ])
  }
}
