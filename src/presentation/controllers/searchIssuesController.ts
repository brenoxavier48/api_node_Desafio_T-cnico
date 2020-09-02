import { Controller, HttpRequest, HttpResponse, Validator } from '../protocols'
import { DateValidator } from '../../utils'
import { badRequest, serverError } from '../helpers'
import { MissingParamError, InvalidParamError } from '../errors'
import { JiraConsult } from '../../infra/jiraConsult'

export class SearchIssuesController implements Controller {
  private readonly organizationValidator: Validator
  private readonly dateValidator: DateValidator
  private readonly jiraConsult: JiraConsult

  constructor (organizationValidator: Validator, dateValidator: DateValidator, jiraConsult: JiraConsult) {
    this.organizationValidator = organizationValidator
    this.dateValidator = dateValidator
    this.jiraConsult = jiraConsult
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

      const dataRequest = Object.assign({}, {organizationCod}, this.dateValidator.format({initialDate,finalDate}))
      const resultIssues = await this.jiraConsult.request(dataRequest)
      
      return {
        statusCode: 200,
        body: resultIssues
      }
    } catch (err) {
      return serverError(err)
    }
    
  }
}