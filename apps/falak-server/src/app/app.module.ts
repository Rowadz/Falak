import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseNotificationsModule } from './database-notifications';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [DatabaseNotificationsModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
