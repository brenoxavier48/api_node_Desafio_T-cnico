import express, { Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes/searchIssuesRoutes'
import 'dotenv/config'

const app = express()

app.use(bodyParser.json())
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')
  next()
});
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
})

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})
