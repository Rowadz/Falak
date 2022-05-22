import { Injectable } from '@nestjs/common';
import { Document, Collection } from 'mongodb';
import { DatabaseNotification } from './database-notification.type';
import { DatabaseNotificationsService } from './database-notifications/database-notifications.service';
import { DatabaseQueryMockService } from './database-notifications/database-query-mock.service';
import { MongoService } from './mongo/mongo.service';
import { dbSubject, dbTablesSubject } from './subjects';

@Injectable()
export class AppService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly databaseNotificationsService: DatabaseNotificationsService,
    private readonly databaseQueryMockService: DatabaseQueryMockService
  ) {
    this.watch();
    setInterval(() => {
      this.getAllTabled();
    }, 2000);
  }

  private async watch() {
    const collection: Collection<Document> = await this.mongoService.createConnection();
    this.databaseNotificationsService.initEeventListener();
    dbSubject.subscribe({
      next: (data: Partial<DatabaseNotification>) => {
        collection.insertOne(data).catch(console.error);
      },
    });
  }

  private async getAllTabled() {
    const DB_NAME = 'my_db';
    const [result] = await this.databaseQueryMockService.mysqlQueryBuilder.raw(
      `SELECT table_name as name FROM information_schema.tables WHERE table_schema = '${DB_NAME}';`
    );
    const names = result?.map(({ name }) => name);
    dbTablesSubject.next({ names });
  }
}
