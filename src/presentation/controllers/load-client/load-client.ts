import { HttpResponse, HttpRequest, Controller, LoadClient } from './load-client-protocols'
import { noContent, ok, serverError } from '../../helpers/http-helper'

export class LoadClientController implements Controller {
  constructor (
    private readonly loadClient: LoadClient
  ) {
    this.loadClient = loadClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const clients = await this.loadClient.load(id)      
      return clients.length ? ok(clients) : noContent()
    } catch (error) {
      return serverError()
    }
  }
}