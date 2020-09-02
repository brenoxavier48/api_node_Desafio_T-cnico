import { Router } from 'express'
import { routeAdapter } from '../adapter/routeAdapter'
import { makeSearchIssuesController } from '../fatories/searchIssues'

const routes = Router()

routes.post('/issues/search', routeAdapter(makeSearchIssuesController()))

export default routes
