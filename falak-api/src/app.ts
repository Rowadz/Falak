import 'reflect-metadata'
import 'module-alias/register'
import { createExpressServer, useContainer } from 'routing-controllers'
import { createServer } from 'http'
import { Container } from 'typedi'
import { config } from 'dotenv'
import { Express } from 'express'
import { sync } from 'glob'
import 'colors'
import { join, basename } from 'path'
import { Server as webSocketServer } from 'socket.io'
import { MysqlService } from '@services'

config()

const { APP_PORT } = process.env

const init = async () => {
  const controllersPath = join(__dirname, 'controllers/**/*.controller.ts')
  const controllersNames = sync(controllersPath).map((path: string) => ({
    name: basename(path),
  }))
  console.group('Controller Names'.cyan.italic.bold)
  console.table(controllersNames)
  console.groupEnd()
  const app: Express = createExpressServer({
    controllers: [controllersPath],
  })
  const http = createServer(app)
  const io = new webSocketServer(http)
  http.listen(APP_PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`🚀 App started on port ${APP_PORT} 🚀`.green.bold)
  })

  Container.set(MysqlService, new MysqlService(io))
  useContainer(Container)
}

init()
