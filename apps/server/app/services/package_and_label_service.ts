import PackageAndLabel from '#models/package_and_label'
import { TPackageAndLabelMutation } from 'types/package-and-label.js'
import { inject } from '@adonisjs/core'
import { MouldService } from '#services/mould_service'

import { TransactionClientContract } from '@adonisjs/lucid/types/database'

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

  async store(payload: TPackageAndLabelMutation, trx?: TransactionClientContract) {
    const { name, note, partnerId, uomId, categoryId, specs } = payload
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

    return packageAndLabel
  }
}
