import 'reflect-metadata'
import { Service } from 'typedi'
import { Connection, createConnection } from 'mysql'
import { config } from 'dotenv'
import { Server, Socket } from 'socket.io'
const MySQLEvents = require('@rodrigogs/mysql-events')

config()

@Service()
export class MysqlService {
  private readonly websocketServer: Server
  readonly connection: Connection
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
        // tslint:disable-next-line: no-console
        console.log('Waiting for database events...')
        this.initMysqlEvent()
      })
      .catch(console.error)
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
        // You will receive the events here
        console.log(event)
      },
    })

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error)
  }

  private initMysqlEvent() {
    this.websocketServer.on('connection', (socket: Socket) => {
      // tslint:disable-next-line: no-console
      console.log('a user connected')
      socket.emit('events', [123]) // TODO send mysql events here
      socket.on('disconnect', () => {
        // tslint:disable-next-line: no-console
        console.log('user disconnected')
      })
    })
  }
}
