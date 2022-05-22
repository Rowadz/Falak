import create from 'zustand';

import { QueryKind } from '@falak/constants';

type DataByTable = {
  [key: string]: {
    INSERT: number;
    DELETE: number;
    UPDATE: number;
  };
};

export type FalakState = {
  tablesToMonitor: string[];
  dataByTable: DataByTable;
  setTablesToBeMonitored: (tableNames: string[]) => void;
  setDataByTable: (tableName: string, event: QueryKind) => void;
};

export const useStore = create<FalakState>((set) => ({
  tablesToMonitor: [],
  dataByTable: {},
  setDataByTable: (tableName: string, event: QueryKind) =>
    set((state: FalakState) => ({
      dataByTable: {
        ...state.dataByTable,
        [tableName]: {
          ...state?.dataByTable?.[tableName],
          [event]: (state?.dataByTable?.[tableName]?.[event] || 0) + 1,
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
