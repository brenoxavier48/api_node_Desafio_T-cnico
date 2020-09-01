import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { badRequest } from '../helpers'
import { MissingParamError } from '../errors'

export class SearchIssuesController implements Controller {
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['clientCod', 'initialDate', 'finalDate']

    const isMissingParams = requiredFields.some(field => !httpRequest.body[field])
    if(isMissingParams) return badRequest(new MissingParamError('"clientCod", "initialDate", "finalDate"'))

    return {
      statusCode: 400,
      body:{empty: true}
    }
  }
}