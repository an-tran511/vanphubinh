import { column } from '@adonisjs/lucid/orm'
import Item from '#models/item'

export default class Mould extends Item {
  public static table = 'items'

  @column()
  declare isStockable: true
}
