import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import { search } from '../utils/search.js'
import AppBaseModel from '#models/app_base_model'

export default class Uom extends AppBaseModel {
  public static search = search(this, ['name'])

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
