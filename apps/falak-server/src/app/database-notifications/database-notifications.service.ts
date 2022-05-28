import { Injectable } from '@nestjs/common';
import { CreateDatabaseNotificationDto } from './dto/create-database-notification.dto';
import { UpdateDatabaseNotificationDto } from './dto/update-database-notification.dto';
import * as MySQLEvents from '@rodrigogs/mysql-events';
import { createConnection } from 'mysql';
import { MySQLDatabaseNotification } from '../database-notification.type';
import { dbSubject } from '../subjects';
import { MongoService } from '../mongo/mongo.service';
import { RowTimeline, WebSocketNotification } from '@falak/constants';
import { AggregationCursor } from 'mongodb';

@Injectable()
export class DatabaseNotificationsService {
  constructor(private readonly mongoService: MongoService) {}

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
    // console.log({ expression, name });
    instance.addTrigger({
      name,
      expression,
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (event: MySQLDatabaseNotification) => {
        // You will receive the events here
        dbSubject.next({
          // affectedColumns: event.affectedColumns,
          affectedRows: event.affectedRows,
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

  findAll(): AggregationCursor<WebSocketNotification> {
    return this.mongoService.collection.aggregate<WebSocketNotification>([
      {
        $group: {
          _id: { type: '$type', table: '$table' },
          count: { $sum: 1 },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$_id', { count: '$count' }],
          },
        },
      },
    ]);
  }

  // TODO:: paginate?
  // TODO:: this should filter by table name too.
  getRowTimeline(id: number): AggregationCursor<RowTimeline> {
    return this.mongoService.collection.aggregate([
      {
        $match: {
          mysql_id: id,
        },
      },
      {
        $sort: {
          created_at: 1,
        },
      },
    ]);
  }

  update(id: number, updateDatabaseNotificationDto: UpdateDatabaseNotificationDto) {
    return `This action updates a #${id} databaseNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} databaseNotification`;
  }
}
