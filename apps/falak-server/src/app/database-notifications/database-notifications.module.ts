import { Module } from '@nestjs/common';
import { DatabaseNotificationsService } from './database-notifications.service';
import { DatabaseNotificationsGateway } from './database-notifications.gateway';

@Module({
  providers: [DatabaseNotificationsGateway, DatabaseNotificationsService]
})
export class DatabaseNotificationsModule {}
