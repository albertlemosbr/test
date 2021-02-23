import { HttpResponse, HttpRequest, Controller, EmailValidator, EditClient } from './edit-client-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import jwt from 'jsonwebtoken'

export class EditClientController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly editClient: EditClient
  ) {
    this.emailValidator = emailValidator
    this.editClient = editClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['token']
      jwt.verify(token, 'secret')
      const requiredFields = ['name', 'email', 'id']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, id } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const client = await this.editClient.edit({
        name,
        email,
        id
      })

      return ok(client) 
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return badRequest(new Error('Invalid Token'))
      }
      return serverError()
    }
  }
}