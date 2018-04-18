import dotenv from 'dotenv'
import * as express from 'express'
import * as line from '@line/bot-sdk'


dotenv.config()
console.log(process.env.CHANNEL_ACCESS_TOKEN)

export default class {

  public client: line.Client = new line.Client({ channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string })
  public middleware: any     = line.middleware({ channelSecret: process.env.CHANNEL_SECRET as string })

  public webhook(req: express.Request, res: express.Response) {
    Promise
      .all(req.body.events.map(async (event: line.WebhookEvent) => {
        console.log(event)
        if (event.type === 'message' && event.message.type === 'text' && event.message.text.toLowerCase() === '/ping') {
          return this.client.replyMessage(event.replyToken, {
            type: 'text',
            text: JSON.stringify(event)
          })
        }
        return Promise.resolve(null)
      }))
      .then((result: any) => res.json(result))
      .catch((err: any) => console.log(err))
  }

  public pushNotification(req: express.Request, res: express.Response) {
    console.log(req.body)
  }
}
