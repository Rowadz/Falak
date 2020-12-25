import 'reflect-metadata'
import { Service } from 'typedi'
import { Connection, createConnection } from 'mysql'
import { config } from 'dotenv'
import { Server, Socket } from 'socket.io'
import { EventEmitter } from 'events'
const MySQLEvents = require('@rodrigogs/mysql-events')

config()

@Service()
export class MysqlService {
  private readonly websocketServer: Server
  readonly connection: Connection
  private readonly mysqlEventEmitter: EventEmitter
  constructor(websocketServer: Server) {
    this.websocketServer = websocketServer
    const { DB_HOST, DB_USER, DB_PASS, DB_PORT } = process.env
    if (!DB_HOST || !DB_USER || !DB_PASS || !DB_PORT) {
      throw new Error(
        'Plz check if you added all of these [DB_HOST, DB_USER, DB_PASS, DB_PORT] to the .env file'
      )
    }
    this.connection = createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: +DB_PORT,
    })
    this.connector()
      .then(() => {
        console.log('Waiting for database events...')
        this.initMysqlEvent()
      })
      .catch(console.error)

    this.mysqlEventEmitter = new EventEmitter()
  }

  async connector(): Promise<void> {
    const instance = new MySQLEvents(this.connection, {
      startAtEnd: true,
      excludedSchemas: { mysql: true },
    })

    await instance.start()

    instance.addTrigger({
      name: 'TEST',
      expression: '*',
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (event: unknown) => {
        this.mysqlEventEmitter.emit('event', event)
      },
    })

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error)
  }

  private initMysqlEvent() {
    this.websocketServer.on('connection', (socket: Socket) => {
      this.mysqlEventEmitter.on('event', (event: unknown) => {
        socket.emit('event', event)
      })
    })
  }
}
