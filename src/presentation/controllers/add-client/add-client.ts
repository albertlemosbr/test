import { HttpResponse, HttpRequest, Controller, EmailValidator, AddClient } from './add-client-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

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
      console.log(error)
      return serverError()
    }
  }
}