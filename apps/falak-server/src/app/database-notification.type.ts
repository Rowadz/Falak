import { QueryKind, AffectedRows } from '@falak/constants';

export type DatabaseNotification = {
  type: QueryKind;
  schema: string;
  table: string;
  affectedRows: AffectedRows[];
  //   TODO:: create type if needed
  affectedColumns?: string[];
};

export type MySQLDatabaseNotification = DatabaseNotification | { [key: string]: any };
