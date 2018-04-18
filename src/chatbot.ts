import dotenv from 'dotenv'
import fs from 'fs'
import * as express from 'express'
import * as line from '@line/bot-sdk'


dotenv.config()

export default class {

  public client: line.Client = new line.Client({ channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string })
  public middleware: any     = line.middleware({ channelSecret: process.env.CHANNEL_SECRET as string })

  public webhook(req: express.Request, res: express.Response) {
    Promise
      .all(req.body.events.map(async (event: line.WebhookEvent) => {
        console.log(event)
        if (event.type === 'message' && event.message.type === 'text') {
          if (event.message.text.toLowerCase() === '/integrate') {
            let sourceId
            if (event.source.type === 'group') {
              sourceId = event.source.groupId
            } else if (event.source.type === 'room') {
              sourceId = event.source.roomId
            } else {
              sourceId = event.source.userId
            }

            let sources = JSON.parse(fs.readFileSync('./source.json').toString())
            sources.push(sourceId)
            fs.writeFileSync('./source.json', sourceId)

            return this.client.replyMessage(event.replyToken, {
              type: 'text',
              text: JSON.stringify(`Successfully integrate to ${sources.map((s: any) => { return `- ${s}` }).join('\n')}`)
            })
          }
        }
        return Promise.resolve(null)
      }))
      .then((result: any) => res.json(result))
      .catch((err: any) => console.log(err))
  }

  public pushNotification(req: express.Request, res: express.Response) {
    let data = req.body
    let sources = JSON.parse(fs.readFileSync('./source.json').toString())
    sources.forEach((sourceId: any) => {
      this.client.pushMessage(sourceId, {
        type: 'text',
        text: `${data.user_name} ${data.event_name} to ${data.ref} in ${data.project.name} project.\n\n` +
          data.commits.map((commit: any) => { return `- ${commit.message} (${commit.url})` }).join('\n\n')
      })
    })
    return res.json({ ok: true })
  }
}
