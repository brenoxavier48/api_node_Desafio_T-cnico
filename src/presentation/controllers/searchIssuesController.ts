import { Controller, HttpRequest, HttpResponse, Validator } from '../protocols'
import { badRequest, serverError } from '../helpers'
import { MissingParamError, InvalidParamError } from '../errors'

export class SearchIssuesController implements Controller {
  private readonly organizationValidator: Validator
  private readonly dateValidator: Validator

  constructor (organizationValidator: Validator, dateValidator: Validator) {
    this.organizationValidator = organizationValidator
    this.dateValidator = dateValidator
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['organizationCod', 'initialDate', 'finalDate']
      const isMissingParams = requiredFields.some(field => !httpRequest.body[field])

      if (isMissingParams) return badRequest(new MissingParamError('"organizationCod", "initialDate", "finalDate"'))

      const { organizationCod, initialDate, finalDate } = httpRequest.body

      const isOrganizationValid = this.organizationValidator.isValid(organizationCod)
      if (!isOrganizationValid) return badRequest(new InvalidParamError('organizationCod'))
      
      const isDateValid =  this.dateValidator.isValid({initialDate,finalDate})
      if (!isDateValid) return badRequest(new InvalidParamError('dates'))

      
      return {
        statusCode: 400,
        body:{empty: true}
      }
    } catch {
      return serverError()
    }
    
  }
}