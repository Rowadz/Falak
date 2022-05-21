import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseNotificationDto } from './create-database-notification.dto';

export class UpdateDatabaseNotificationDto extends PartialType(
  CreateDatabaseNotificationDto
) {
  id: number;
}
