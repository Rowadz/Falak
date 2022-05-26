import { Module } from '@nestjs/common';
import { DatabaseNotificationsService } from './database-notifications.service';
import { DatabaseNotificationsGateway } from './database-notifications.gateway';
import { DatabaseQueryMockService } from './database-query-mock.service';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [DatabaseNotificationsGateway, DatabaseNotificationsService, DatabaseQueryMockService],
  exports: [DatabaseNotificationsService, DatabaseQueryMockService],
})
export class DatabaseNotificationsModule {}
