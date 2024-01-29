import PackageAndLabel from '#models/package_and_label'
import { TPackageAndLabel, TPackageAndLabelMutation } from 'types/package-and-label.js'

export class PackageAndLabelService {
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

  async store({ name, note, partnerId, uomId, categoryId, specs }: TPackageAndLabelMutation) {
    const packageAndLabel = await PackageAndLabel.create({
      name,
      note,
      uomId,
      categoryId,
      partnerId,
      specs,
    }).catch((error) => {
      return error
    })
    return packageAndLabel
  }
}
