import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

// TODO:: this mock service is 💩
// TODO:: make it better
@Injectable()
export class DatabaseQueryMockService {
  mysqlQueryBuilder: Knex;

  constructor() {
    this.mysqlQueryBuilder = this.init();
    // setInterval(() => {
    //   this.randomInserts();
    //   // this.randomDeletes();
    // }, 4000);

    // setInterval(() => {
    //   this.randomDeletes();
    // }, 2000);

    // setInterval(() => {
    //   this.randomInserts2();
    // }, 1000);

    setInterval(() => {
      this.randomUpdates2();
    }, 2000);

    // setInterval(() => {
    //   this.randomDeletes2();
    // }, 4000);
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
        email: Math.random() > 0.5 ? 'b' : 'a',
        name: 'rowadz',
        user_id: 1,
        address: 'rowadz',
        phone: '312312',
      })
      .then(() => console.log('➕ INSERTED a row ➕'))
      .catch(console.error);
  }

  private async randomDeletes() {
    this.mysqlQueryBuilder('contacts')
      .delete()
      .where({ email: Math.random() > 0.5 ? 'b' : 'a' })
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
      .update({ status: Math.random() > 0.5 ? 'WHAT?' : 'NICE STATUS!' })
      .where({ id: 678 })
      .then(() => console.log('📐 UPDATED a row 📐'))
      .catch(console.error);
  }
}
