import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class DatabaseQueryMockService {
  mysqlQueryBuilder: Knex;

  constructor() {
    this.mysqlQueryBuilder = this.init();
    setInterval(() => {
      this.randomInserts();
    }, 2000);
    setInterval(() => {
      this.randomDeletes();
    }, 4000);
  }

  private init() {
    const mysqlQueryBuilder: Knex = knex({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'secret',
        database: 'my_db',
      },
    });
    mysqlQueryBuilder.raw('SELECT 1').then(() => {
      console.log('🚀🚀 Connected to DB');
    });
    return mysqlQueryBuilder;
  }

  private async randomInserts() {
    this.mysqlQueryBuilder('contacts')
      .insert({
        email: 'b',
        name: 'rowadz',
        address: 'rowadz',
        phone: '312312',
      })
      .then(() => console.log('➕ INSERTED a row ➕'))
      .catch(console.error);
  }

  private async randomDeletes() {
    this.mysqlQueryBuilder('contacts')
      .delete()
      .where({ email: 'b' })
      .then(() => console.log('❌ DELETED a row ❌'))
      .catch(console.error);
  }
}
