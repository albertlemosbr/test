import { HttpResponse, HttpRequest, Controller, EmailValidator, AddClient } from './add-client-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import jwt from 'jsonwebtoken'

export class AddClientController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addClient: AddClient
  ) {
    this.emailValidator = emailValidator
    this.addClient = addClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['token']
      jwt.verify(token, 'secret')
      const requiredFields = ['name', 'email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const client = await this.addClient.add({
        name,
        email,
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