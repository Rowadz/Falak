import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { DatabaseNotificationsService } from './database-notifications.service';
import { CreateDatabaseNotificationDto } from './dto/create-database-notification.dto';
import { UpdateDatabaseNotificationDto } from './dto/update-database-notification.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DatabaseNotificationsGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly databaseNotificationsService: DatabaseNotificationsService
  ) {
    setInterval(() => {
      console.log('1');
      this.server.emit('hmmmm', [{ name: 'rowadz', age: 21 }]);
    }, 2000);
  }

  @SubscribeMessage('createDatabaseNotification')
  create(
    @MessageBody() createDatabaseNotificationDto: CreateDatabaseNotificationDto
  ) {
    return this.databaseNotificationsService.create(
      createDatabaseNotificationDto
    );
  }

  @SubscribeMessage('findAllDatabaseNotifications')
  findAll() {
    return this.databaseNotificationsService.findAll();
  }

  @SubscribeMessage('findOneDatabaseNotification')
  findOne(@MessageBody() id: number) {
    return this.databaseNotificationsService.findOne(id);
  }

  @SubscribeMessage('updateDatabaseNotification')
  update(
    @MessageBody() updateDatabaseNotificationDto: UpdateDatabaseNotificationDto
  ) {
    return this.databaseNotificationsService.update(
      updateDatabaseNotificationDto.id,
      updateDatabaseNotificationDto
    );
  }

  @SubscribeMessage('removeDatabaseNotification')
  remove(@MessageBody() id: number) {
    return this.databaseNotificationsService.remove(id);
  }
}
