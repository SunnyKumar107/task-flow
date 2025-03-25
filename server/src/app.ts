import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDb from './utils/connect-db'

import taskRoute from './routes/task.route'

import unknownEndpoint from './middlewares/unknown-endpoint'
import errorHandler from './middlewares/error-handler'

connectDb()

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/api/tasks', taskRoute)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
