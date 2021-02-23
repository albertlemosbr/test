import { HttpResponse, HttpRequest, Controller, LoadClient } from './load-client-protocols'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import jwt from 'jsonwebtoken'

export class LoadClientController implements Controller {
  constructor (
    private readonly loadClient: LoadClient
  ) {
    this.loadClient = loadClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['token']
      jwt.verify(token, 'secret')
      const { id } = httpRequest.params
      const clients = await this.loadClient.load(id)      
      return clients.length ? ok(clients) : noContent()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return badRequest(new Error('Invalid Token'))
      }
      return serverError()
    }
  }
}