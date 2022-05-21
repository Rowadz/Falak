import { Subject } from 'rxjs';
import { DatabaseNotification } from './database-notification.type';

export const dbSubject: Subject<Partial<DatabaseNotification>> = new Subject<
  Partial<DatabaseNotification>
>();
