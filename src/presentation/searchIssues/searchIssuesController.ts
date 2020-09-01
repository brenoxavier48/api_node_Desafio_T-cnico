import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { badRequest, serverError } from '../helpers'
import { MissingParamError } from '../errors'

export class SearchIssuesController implements Controller {
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['clientCod', 'initialDate', 'finalDate']

      throw 'eae'
      const isMissingParams = requiredFields.some(field => !httpRequest.body[field])
      if(isMissingParams) return badRequest(new MissingParamError('"clientCod", "initialDate", "finalDate"'))


      return {
        statusCode: 400,
        body:{empty: true}
      }
    } catch {
      return serverError()
    }
    
  }
}