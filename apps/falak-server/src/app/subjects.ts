import { Subject } from 'rxjs';
import { AallTables } from '@falak/constants';
import { DatabaseNotification } from './database-notification.type';

export const dbSubject: Subject<Partial<DatabaseNotification>> = new Subject<
  Partial<DatabaseNotification>
>();

export const dbTablesSubject: Subject<AallTables> = new Subject<AallTables>();
