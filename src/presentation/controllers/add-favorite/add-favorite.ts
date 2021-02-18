import { HttpResponse, HttpRequest, Controller, AddFavorite } from './add-favorite-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class AddFavoriteController implements Controller {
  constructor (
    private readonly addFavorite: AddFavorite
  ) {
    this.addFavorite = addFavorite
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['clientId', 'productId']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { clientId, productId } = httpRequest.body      

      const favorite = await this.addFavorite.addFavorite({
        clientId,
        productId,
      })

      return ok(favorite) 
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}