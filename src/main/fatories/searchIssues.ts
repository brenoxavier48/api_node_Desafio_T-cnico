import { SearchIssuesController } from '../../presentation/controllers/searchIssuesController'
import { OrganizationValidator, DateValidator } from '../../utils'
import { AxiosAdapter } from '../../infra/axios-adapter/axios-adapter'
import { JiraConsult } from '../../infra/jiraConsult'
import 'dotenv/config'

export const makeSearchIssuesController = (): SearchIssuesController => {
  const config = {
    baseURL: process.env.URL_JIRA_API,
    headers: {
      'Authorization': `Basic ${process.env.TOKEN_JIRA}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const organizationValidator = new OrganizationValidator()
  const dateValidator = new DateValidator()
  const axiosAdapter = new AxiosAdapter(config)
  const jiraConsult = new JiraConsult(axiosAdapter)
  return new SearchIssuesController(organizationValidator, dateValidator, jiraConsult)
}
