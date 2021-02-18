import { HttpResponse, HttpRequest, Controller, DeleteClient } from './delete-client-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class DeleteClientController implements Controller {
  constructor (
    private readonly deleteClient: DeleteClient
  ) {
    this.deleteClient = deleteClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id } = httpRequest.params     

      const client = await this.deleteClient.delete(id)

      return ok(client) 
    } catch (error) {
      return serverError()
    }
  }
}