import Category from '#models/category'
import Mould from '#models/mould'
import PackageAndLabel from '#models/package_and_label'
import Uom from '#models/uom'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { TMouldMutation } from 'types/mould.js'

export class MouldService {
  async find({
    searchValue,
    page,
    perPage,
  }: {
    searchValue: string
    page: number
    perPage: number
  }) {
    const items = await PackageAndLabel.query()
      .preload('partner')
      .withScopes((scopes) => scopes.search(searchValue))
      .paginate(page, perPage)
    return items
  }

  async findById(id: number) {
    const item = await PackageAndLabel.findOrFail(id)
    return item
  }

  async store({ name, note, partnerId, specs }: TMouldMutation, trx?: TransactionClientContract) {
    const mouldUom = await Uom.query({ client: trx }).where('name', 'cây').firstOrFail()
    const mouldCategory = await Category.query({ client: trx })
      .whereILike('name', 'Trục')
      .firstOrFail()
    const mouldName = name?.toLowerCase().includes('trục')
      ? name
      : `Trục ${name.charAt(0).toLowerCase() + name.slice(1)}`
    const mould = await Mould.create(
      {
        name: mouldName,
        note,
        uomId: mouldUom.id,
        categoryId: mouldCategory.id,
        partnerId,
        specs,
      },
      { client: trx }
    ).catch((error) => {
      return error
    })
    return mould
  }
}
