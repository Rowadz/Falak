import { Module } from '@nestjs/common';
import { DatabaseNotificationsService } from './database-notifications.service';
import { DatabaseNotificationsGateway } from './database-notifications.gateway';
import { DatabaseQueryMockService } from './database-query-mock.service';

@Module({
  providers: [
    DatabaseNotificationsGateway,
    DatabaseNotificationsService,
    DatabaseQueryMockService,
  ],
})
export class DatabaseNotificationsModule {}
