import { HttpResponse, HttpRequest, Controller, AddFavorite } from './add-favorite-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import jwt from 'jsonwebtoken'

export class AddFavoriteController implements Controller {
  constructor (
    private readonly addFavorite: AddFavorite
  ) {
    this.addFavorite = addFavorite
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['token']
      jwt.verify(token, 'secret')
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
      if (error.name === 'JsonWebTokenError') {
        return badRequest(new Error('Invalid Token'))
      }
      return serverError()
    }
  }
}