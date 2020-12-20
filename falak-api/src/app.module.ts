import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLGateway } from './mysql.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MySQLGateway],
})
export class AppModule {}
