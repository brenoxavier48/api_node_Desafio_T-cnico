import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { SearchIssuesController } from '../presentation/controllers/searchIssuesController'
import { OrganizationValidator } from '../utils/organizationValidator'

const app = express()
app.use(bodyParser.json())
const organizationValidator = new OrganizationValidator()
const searchIssuesController = new SearchIssuesController(organizationValidator)
app.post('/test', async (req: Request, resp: Response) => {
  const httpResponse = await searchIssuesController.handler(req)
  resp.json(httpResponse)
})

app.listen(3000)

console.log('App rodando porta 3000')
