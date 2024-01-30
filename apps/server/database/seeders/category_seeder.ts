import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    await Category.createMany([
      {
        id: 1,
        name: 'Trục',
      },
      {
        id: 2,
        name: 'Bao bì & nhãn mác',
      },
      {
        id: 3,
        name: 'Áo bình trắng',
        parentCatId: 2,
      },
      {
        id: 4,
        name: 'Áo bình xanh',
        parentCatId: 2,
      },
      {
        id: 5,
        name: 'Lốc',
        parentCatId: 2,
      },
      {
        id: 6,
        name: 'Nhãn mác',
        parentCatId: 2,
      },
    ])
  }
}
