import { FalakState } from './store';

export const setTablesToBeMonitoredSelector = (state: FalakState) => state.setTablesToBeMonitored;
export const setDataByTableSelector = (state: FalakState) => state.setDataByTable;
export const dataByTableSelector = (state: FalakState) => state.dataByTable;
export const setIsConnectedSelector = (state: FalakState) => state.setIsConnected;
export const setTableNamesSelector = (state: FalakState) => state.setTableNames;
export const tableNamesSelector = (state: FalakState) => state.tableNames;
export const isConnectedSelector = (state: FalakState) => state.isConnected;
export const themeSelector = (state: FalakState) => state.theme;
export const setThemeSelector = (state: FalakState) => state.setTheme;

export const tablesToMonitorSelector = (state: FalakState) => state.tablesToMonitor;
