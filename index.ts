import * as express from 'express'
import Chatbot from './src/chatbot'
import bodyParser from 'body-parser'

const app       = express.default()
const chatbot   = new Chatbot()

app.use('/webhook', chatbot.middleware, (req: express.Request, res: express.Response) => {
  chatbot.webhook(req, res)
})

app.use(bodyParser.json())
app.use('/gitlab', chatbot.pushNotification)

app.use('/ping', (req: express.Request, res: express.Response) => {
  return res.json({ pong: 1 })
})

app.listen(process.env.PORT || 7581, () => {
  console.log(`Server listen at port ${process.env.port || 7581}...`)
})
