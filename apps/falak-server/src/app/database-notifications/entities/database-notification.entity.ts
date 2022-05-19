export type DatabaseNotification = {
  type: 'INSERT' | 'DELETE' | 'UPDATE';
  schema: string;
  table: string;
  //   TODO:: create type if needed
  affectedRows?: any[];
  //   TODO:: create type if needed
  affectedColumns?: string[];
};

export type MySQLDatabaseNotification =
  | DatabaseNotification
  | { [key: string]: any };
