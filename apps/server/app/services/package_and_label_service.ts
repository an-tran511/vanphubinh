import PackageAndLabel from '#models/package_and_label'
import { TPackageAndLabel, TPackageAndLabelMutation } from 'types/package-and-label.js'
import { inject } from '@adonisjs/core'
import { MouldService } from '#services/mould_service'
import db from '@adonisjs/lucid/services/db'
import Uom from '#models/uom'
import Category from '#models/category'

@inject()
export class PackageAndLabelService {
  constructor(protected mouldService: MouldService) {}

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

  async store({
    name,
    note,
    partnerId,
    uomId,
    categoryId,
    specs,
    mould,
  }: TPackageAndLabelMutation) {
    return await db.transaction(async (trx) => {
      const packageAndLabel = await PackageAndLabel.create(
        {
          name,
          note,
          uomId,
          categoryId,
          partnerId,
          specs,
        },
        { client: trx }
      )
      if (mould) {
        const mouldUom = await Uom.query({ client: trx }).where('name', 'cây').firstOrFail()
        const mouldCategory = await Category.query({ client: trx })
          .whereILike('name', 'Trục')
          .firstOrFail()

        await packageAndLabel.related('moulds').create({
          name,
          partnerId,
          uomId: mouldUom.id,
          purchaseUomId: mouldUom.id,
          categoryId: mouldCategory.id,
          specs: mould,
        }),
          {
            client: trx,
          }
      }

      return packageAndLabel
    })
  }
}
