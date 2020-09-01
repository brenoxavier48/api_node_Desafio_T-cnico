import { Controller, HttpRequest, HttpResponse, Validator } from '../protocols'
import { badRequest, serverError } from '../helpers'
import { MissingParamError, InvalidParamError } from '../errors'

export class SearchIssuesController implements Controller {
  private readonly organizationValidator: Validator

  constructor (organizationValidator: Validator) {
    this.organizationValidator = organizationValidator
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['organizationCod', 'initialDate', 'finalDate']
      const isMissingParams = requiredFields.some(field => !httpRequest.body[field])

      if (isMissingParams) return badRequest(new MissingParamError('"organizationCod", "initialDate", "finalDate"'))

      const { organizationCod, initialDate, finalDate } = httpRequest.body
      const organizationIsValid = this.organizationValidator.isValid(organizationCod)

      if (!organizationIsValid) return badRequest(new InvalidParamError('organizationCod'))

      return {
        statusCode: 400,
        body:{empty: true}
      }
    } catch {
      return serverError()
    }
    
  }
}