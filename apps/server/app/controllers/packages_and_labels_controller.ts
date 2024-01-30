import Item from '#models/item'
import PackageAndLabel from '#models/package_and_label'
import { MouldService } from '#services/mould_service'
import { PackageAndLabelService } from '#services/package_and_label_service'
import { createPackageAndLabelValidator } from '#validators/package_and_label'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class PackagesAndLabelsController {
  constructor(
    protected packageAndLabelService: PackageAndLabelService,
    protected mouldService: MouldService
  ) {}

  public async index({ request, response }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const items = await this.packageAndLabelService
      .find({ searchValue, page, perPage })
      .catch((error) => {
        return response.internalServerError(error)
      })
    return items
  }

  public async show({ params, response }: HttpContext) {
    const item = await this.packageAndLabelService.findById(params.id).catch((error) => {
      return response.internalServerError(error)
    })
    return item
  }

  public async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createPackageAndLabelValidator.validate(data)
    const trx = await db.transaction()

    try {
      const item = await this.packageAndLabelService.store(payload, trx)
      if (payload.mould) {
        await this.mouldService.store(payload, trx)
      }
      await trx.commit()
      return response.created(item)
    } catch (error) {
      await trx.rollback()
      return response.internalServerError(error)
    }
  }
}
