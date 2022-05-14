import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseNotificationsModule } from './database-notifications/database-notifications.module';

@Module({
  imports: [DatabaseNotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
