export type QueryKind = 'INSERT' | 'DELETE' | 'UPDATE';

export type WebSocketNotification = {
  type: QueryKind;
  count: number;
  table: string;
};

export type AllTablesNames = string[];
