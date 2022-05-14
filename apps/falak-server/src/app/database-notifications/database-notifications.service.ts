import { Injectable } from '@nestjs/common';
import { CreateDatabaseNotificationDto } from './dto/create-database-notification.dto';
import { UpdateDatabaseNotificationDto } from './dto/update-database-notification.dto';

@Injectable()
export class DatabaseNotificationsService {
  create(createDatabaseNotificationDto: CreateDatabaseNotificationDto) {
    return 'This action adds a new databaseNotification';
  }

  findAll() {
    return `This action returns all databaseNotifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} databaseNotification`;
  }

  update(id: number, updateDatabaseNotificationDto: UpdateDatabaseNotificationDto) {
    return `This action updates a #${id} databaseNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} databaseNotification`;
  }
}
