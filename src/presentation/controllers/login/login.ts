import { HttpResponse, HttpRequest, Controller } from './login-protocols'
import { serverError } from '../../helpers/http-helper'
import jwt from 'jsonwebtoken'

export class LoginController implements Controller {
  constructor (  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {      
      return {
        statusCode: 200,
        body: jwt.sign({ id: 'id'}, 'secret', { expiresIn: "1h" })
      }      
    } catch (error) {
      return serverError()
    }
  }
}