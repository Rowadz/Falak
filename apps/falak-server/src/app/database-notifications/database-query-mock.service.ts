import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

// TODO:: this mock service is 💩
// TODO:: make it better
@Injectable()
export class DatabaseQueryMockService {
  mysqlQueryBuilder: Knex;

  constructor() {
    this.mysqlQueryBuilder = this.init();
    setInterval(() => {
      this.randomInserts();
      this.randomDeletes();
    }, 2000);

    setInterval(() => {
      this.randomDeletes();
    }, 200);

    setInterval(() => {
      this.randomInserts2();
    }, 100);

    setInterval(() => {
      this.randomUpdates2();
    }, 300);

    setInterval(() => {
      this.randomDeletes2();
    }, 400);
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
      // .where({ email: 'b' })
      .then(() => console.log('❌ DELETED a row ❌'))
      .catch(console.error);
  }

  private async randomInserts2() {
    this.mysqlQueryBuilder('orders')
      .insert({
        title: 'b',
        start_date: new Date(),
        due_date: new Date(),
        status: 'rowadz',
      })
      .then(() => console.log('➕ INSERTED a row ➕'))
      .catch(console.error);
  }

  private async randomDeletes2() {
    this.mysqlQueryBuilder('orders')
      .delete()
      .where({ title: 'b' })
      .then(() => console.log('❌ DELETED a row ❌'))
      .catch(console.error);
  }

  private async randomUpdates2() {
    this.mysqlQueryBuilder('orders')
      .update({ title: 'hmmmm?' })
      .where({ title: 'b' })
      .then(() => console.log('📐 UPDATED a row 📐'))
      .catch(console.error);
  }
}
