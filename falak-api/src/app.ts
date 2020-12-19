import 'reflect-metadata'
import 'module-alias/register'
import { createExpressServer, useContainer } from 'routing-controllers'
import { IncomingHttpHeaders } from 'http'
import { Container } from 'typedi'
import { config } from 'dotenv'
import { Express } from 'express'
import { sync } from 'glob'
import 'colors'
import { join, basename } from 'path'
import { MysqlService } from '@services'

config()

const { APP_PORT, EXT, JWT_SECRET, CONNECT_WITH_DB } = process.env

const init = async () => {
  const getJWT = ({ authorization }: IncomingHttpHeaders): string | null => {
    if (authorization) {
      const [, token] = authorization.split(' ')
      return token
    } else {
      return null
    }
  }

  const controllersPath = join(__dirname, `controllers/**/*.controller.${EXT}`)
  const controllersNames = sync(controllersPath).map((path: string) => ({
    name: basename(path),
  }))
  console.group('Controller Names'.cyan.italic.bold)
  console.table(controllersNames)
  console.groupEnd()
  const app: Express = createExpressServer({
    controllers: [controllersPath],
  })
  app.listen(APP_PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`🚀 App started on port ${APP_PORT} 🚀`.green.bold)
  })

  
  Container.set(MysqlService, new MysqlService())
  useContainer(Container)
}

init()
