import type { Document } from 'mongodb';

export type QueryKind = 'INSERT' | 'DELETE' | 'UPDATE';

export type WebSocketNotification = {
  type: QueryKind;
  count: number;
  table: string;
};

export type AffectedRows = {
  after?: Record<string | number, unknown>;
  before?: Record<string | number, unknown>;
};

export type RowHistory = {
  mysql_id: number;
  type: QueryKind;
  table: string;
  created_at: number;
};

export type RowTimeline = Document & AffectedRows & RowHistory;

export type AllTablesNames = string[];
