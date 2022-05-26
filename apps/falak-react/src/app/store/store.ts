import create from 'zustand';

import { QueryKind } from '@falak/constants';

type DataByTable = {
  [key: string]: {
    INSERT: number;
    DELETE: number;
    UPDATE: number;
  };
};

export type FalakTheme = 'light' | 'dark' | 'high-contrast';

export type FalakState = {
  tablesToMonitor: string[];
  dataByTable: DataByTable;
  tableNames: string[];
  isConnected: boolean;
  theme: FalakTheme;
  setTheme: (theme: FalakTheme) => void;
  setTablesToBeMonitored: (tableNames: string[]) => void;
  setDataByTable: (tableName: string, event: QueryKind, count?: number) => void;
  setTableNames: (tableNames: string[]) => void;
  setIsConnected: (isConnected: boolean) => void;
};

export const useStore = create<FalakState>((set) => ({
  tablesToMonitor: [],
  dataByTable: {},
  isConnected: false,
  tableNames: [],
  theme: 'dark',
  setTheme: (theme: FalakTheme) => set({ theme }),
  setTableNames: (tableNames: string[]) => set({ tableNames }),
  setIsConnected: (isConnected: boolean) => set(() => ({ isConnected })),
  setDataByTable: (tableName: string, event: QueryKind, count?: number) =>
    set((state: FalakState) => ({
      dataByTable: {
        ...state.dataByTable,
        [tableName]: {
          ...state?.dataByTable?.[tableName],
          [event]: (state?.dataByTable?.[tableName]?.[event] || 0) + (count || 1),
        },
      },
    })),
  setTablesToBeMonitored: (tableNames: string[]) => {
    set((state: FalakState) => {
      const newDataByTable = tableNames?.reduce<DataByTable>(
        (prev: DataByTable, tableName: string) =>
          state.dataByTable[tableName]
            ? prev
            : { [tableName]: { DELETE: 0, INSERT: 0, UPDATE: 0 } },
        {}
      );
      return {
        tablesToMonitor: tableNames || [],
        dataByTable: { ...state.dataByTable, ...newDataByTable },
      };
    });
  },
}));
