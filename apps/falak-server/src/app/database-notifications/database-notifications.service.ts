import { Injectable } from '@nestjs/common';
import { CreateDatabaseNotificationDto } from './dto/create-database-notification.dto';
import { UpdateDatabaseNotificationDto } from './dto/update-database-notification.dto';
import * as MySQLEvents from '@rodrigogs/mysql-events';
import { createConnection } from 'mysql';
import { MySQLDatabaseNotification } from '../database-notification.type';
import { dbSubject } from '../subjects';

@Injectable()
export class DatabaseNotificationsService {
  async initEeventListener() {
    const connection = createConnection({
      host: 'localhost',
      user: 'root',
      password: 'secret',
    });
    const instance = new MySQLEvents(connection, {
      startAtEnd: true,
      excludedSchemas: {
        mysql: true,
      },
    });

    await instance.start();
    if (process.env.DB_TABLES?.length) {
      process.env.DB_TABLES.split(',').forEach((tableName: string) => {
        this.addTrigger(instance, `${process.env.DB_NAME}.${tableName}`, tableName);
      });
    } else {
      this.addTrigger(instance);
    }

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  }

  private addTrigger(instance: any, expression = '*', name = 'ALL_TABLES') {
    console.log({ expression, name });
    instance.addTrigger({
      name,
      expression,
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (event: MySQLDatabaseNotification) => {
        // You will receive the events here
        dbSubject.next({
          // affectedColumns: event.affectedColumns,
          // schema: event.schema,
          table: event.table,
          type: event.type,
        });
      },
    });
  }

  create(createDatabaseNotificationDto: CreateDatabaseNotificationDto) {
    return 'This action adds a new databaseNotification';
  }

  findAll() {
    return `This action returns all databaseNotifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} databaseNotification`;
  }

  update(id: number, updateDatabaseNotificationDto: UpdateDatabaseNotificationDto) {
    return `This action updates a #${id} databaseNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} databaseNotification`;
  }
}
