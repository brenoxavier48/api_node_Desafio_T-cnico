import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes/searchIssuesRoutes'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})
