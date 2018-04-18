GitLab LINE Notifier
====================

GitLab notification for LINE app on trigger events.

## Requirements
 - NodeJS > 6.0
 - Typescript > 2.0

## How to start
 - Create LINE chat bot (https://developers.line.me/en/)
 - Define global variables with `CHANNEL_SECRET` and `CHANNEL_ACCESS_TOKEN` (see `.env.example`)
 - Deploy this code to your own server by run:

```
npm install
npm start
```

 - Add integrations to your repository in GitLab (https://gitlab.com/parabot/line-notifier/settings/integrations)
 - Integrate to your group/room/personal chat by add your bot and type `/integrate`

## How to contribute
Just send your pull request to this repository.
