import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { SearchIssuesController } from '../presentation/controllers/searchIssuesController'
import { OrganizationValidator, DateValidator } from '../utils'
import { AxiosAdapter } from '../infra/axios-adapter/axios-adapter'
import { JiraConsult } from '../infra/jiraConsult'
import 'dotenv/config'

const app = express()
app.use(bodyParser.json())
const organizationValidator = new OrganizationValidator()
const dateValidator = new DateValidator()

const axiosAdapter = new AxiosAdapter({
  baseURL: process.env.URL_JIRA_API,
  headers: {
    'Authorization': `Basic ${process.env.TOKEN_JIRA}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
const jiraConsult = new JiraConsult(axiosAdapter)

const searchIssuesController = new SearchIssuesController(organizationValidator, dateValidator, jiraConsult)

app.post('/test', async (req: Request, resp: Response) => {
  const httpResponse = await searchIssuesController.handler(req)
  resp.json(httpResponse)
})

app.listen(3000)

console.log('App rodando porta 3000')
