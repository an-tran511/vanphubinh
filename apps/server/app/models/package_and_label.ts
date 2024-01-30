import { column, hasMany } from '@adonisjs/lucid/orm'
import Item from '#models/item'
import Mould from '#models/mould'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import types from 'types/item-type.js'

export default class PackageAndLabel extends Item {
  public static table = 'items'

  @column()
  declare isStockable: true

  @column()
  declare mouldId: number

  @hasMany(() => Mould)
  declare moulds: HasMany<typeof Mould>

  @column()
  declare itemViewType: types.ItemViewType.PACKAGE_AND_LABEL
}
