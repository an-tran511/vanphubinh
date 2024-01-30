import { column } from '@adonisjs/lucid/orm'
import Item from '#models/item'
import types from 'types/item-type.ts'

export default class Mould extends Item {
  public static table = 'items'

  @column()
  declare isStockable: true

  @column()
  declare itemViewType: types.ItemViewType.PACKAGE_AND_LABEL
}
