import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'


const app = express()
app.use(bodyParser.json())


app.post('/test', async (req: Request, resp: Response) => {
  const httpResponse = await searchIssuesController.handler(req)
  resp.json(httpResponse)
})

app.listen(3000)

console.log('App rodando porta 3000')
