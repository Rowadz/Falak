import { QueryKind } from '@falak/constants';

export type DatabaseNotification = {
  type: QueryKind;
  schema: string;
  table: string;
  //   TODO:: create type if needed
  affectedRows?: any[];
  //   TODO:: create type if needed
  affectedColumns?: string[];
};

export type MySQLDatabaseNotification = DatabaseNotification | { [key: string]: any };
