import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { badRequest } from '../helpers'

export class SearchIssuesController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['clientCod', 'initialDate', 'finalDate']

    const isMissingParams = requiredFields.some(field => !httpRequest.body[field])
    if(isMissingParams) badRequest(new Error('Missing params error'))

    return new Promise(resolve => resolve())
  }
}