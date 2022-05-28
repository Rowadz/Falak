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
import { DatabaseNotification } from '../database-notification.type';
import { dbSubject } from '../subjects';
import {
  NOTIFICATION,
  ALL_TABELS,
  WebSocketNotification,
  FIND_ALL_DB_NOTIFICATION,
  AllTablesNames,
  GET_ROW_TIMELINE,
  TIMELINE,
  RowTimeline,
} from '@falak/constants';
import { DatabaseQueryMockService } from './database-query-mock.service';

@WebSocketGateway()
export class DatabaseNotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly databaseNotificationsService: DatabaseNotificationsService,
    private readonly databaseQueryMockService: DatabaseQueryMockService
  ) {
    dbSubject.subscribe({
      next: (data: Partial<DatabaseNotification>) => {
        this.server.emit(NOTIFICATION, data);
      },
    });
  }

  @SubscribeMessage('createDatabaseNotification')
  create(@MessageBody() createDatabaseNotificationDto: CreateDatabaseNotificationDto) {
    return this.databaseNotificationsService.create(createDatabaseNotificationDto);
  }

  @SubscribeMessage(FIND_ALL_DB_NOTIFICATION)
  async findAll(): Promise<void> {
    const pastNotfications: WebSocketNotification[] = await this.databaseNotificationsService
      .findAll()
      .toArray();
    this.server.emit(NOTIFICATION, pastNotfications);
  }

  @SubscribeMessage(GET_ROW_TIMELINE)
  async findOne(@MessageBody() id: number): Promise<void> {
    const rowTimeline: RowTimeline[] = await this.databaseNotificationsService
      .getRowTimeline(id)
      .toArray();
    this.server.emit(TIMELINE, rowTimeline);
  }

  @SubscribeMessage(ALL_TABELS)
  async getAllTables() {
    const DB_NAME = 'my_db';
    const [result] = await this.databaseQueryMockService.mysqlQueryBuilder.raw(
      `SELECT table_name as name FROM information_schema.tables WHERE table_schema = '${DB_NAME}';`
    );
    const names: AllTablesNames = result?.map(({ name }) => name);
    this.server.emit(ALL_TABELS, names);
  }

  @SubscribeMessage('updateDatabaseNotification')
  update(@MessageBody() updateDatabaseNotificationDto: UpdateDatabaseNotificationDto) {
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
