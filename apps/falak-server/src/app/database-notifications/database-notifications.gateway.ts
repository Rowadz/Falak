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
import { Subject } from 'rxjs';
import { DatabaseQueryMockService } from './database-query-mock.service';
import { DatabaseNotification } from './entities/database-notification.entity';

@WebSocketGateway()
export class DatabaseNotificationsGateway {
  @WebSocketServer()
  server: Server;

  dbSubject: Subject<DatabaseNotification> =
    new Subject<DatabaseNotification>();

  constructor(
    private readonly databaseNotificationsService: DatabaseNotificationsService,
    private readonly databaseQueryMockService: DatabaseQueryMockService
  ) {
    this.subscribeToMySQL();
  }

  private async subscribeToMySQL() {
    this.databaseNotificationsService.initEeventListener(this.dbSubject);
    this.dbSubject.subscribe({
      next: (data: Partial<DatabaseNotification>) => {
        this.server.emit('NOTIFICATION', data);
      },
    });
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
