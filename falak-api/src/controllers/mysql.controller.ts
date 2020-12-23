import { JsonController } from 'routing-controllers'
import { MysqlService } from '@services'

@JsonController('/')
export class MysqlContoller {
  constructor(private readonly MysqlService: MysqlService) {}
}
