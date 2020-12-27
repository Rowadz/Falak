import 'reflect-metadata'
import { Service } from 'typedi'
import { MysqlService } from './mysql.service'
import { MysqlError } from 'mysql'
import { SimulationCUD, SimulationCUDFunc, CUD } from '@types'

@Service()
export class OperationsSimulationService {
  private readonly funcsMap: Map<number, SimulationCUDFunc>
  constructor(private readonly mysqlService: MysqlService) {
    this.funcsMap = new Map([
      [1, this.create],
      [2, this.delete],
      [3, this.update],
    ])
  }

  init(): void {
    setInterval(() => {
      const num: number = Math.floor(Math.random() * 3) + 1
      const { sql, type } = (this.funcsMap.get(num) as SimulationCUDFunc)()
      this.runQuery(sql, type)
    }, 500)
  }

  private create(): SimulationCUD {
    return {
      type: 'create',
      sql: `INSERT INTO sample.peoples (firstname,lastname,email) VALUES('rowad','rowadzzz','rowadz@test.com');`,
    }
  }
  private delete(): SimulationCUD {
    return {
      type: 'delete',
      sql: `DELETE FROM sample.peoples WHERE email = 'rowadz@test.com';`,
    }
  }
  private update(): SimulationCUD {
    return {
      type: 'update',
      sql: `UPDATE sample.peoples SET firstname = 'rowadzzzz' WHERE email = 'rowadz@test.com'`,
    }
  }

  private runQuery(sql: string, type: CUD) {
    this.mysqlService.connection
      .query({
        sql,
      })
      .on('error', (e: MysqlError) => console.error(e))
      .on('result', () => console.log(`Query of type ${type} is done`))
  }
}


/**

    CREATE TABLE `peoples` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `firstname` varchar(30) NOT NULL,
        `lastname` varchar(30) NOT NULL,
        `email` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`id`)
    );
 */