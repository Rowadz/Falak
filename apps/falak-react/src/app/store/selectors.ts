import { FalakState } from './store';

export const setTablesToBeMonitoredSelector = (state: FalakState) => state.setTablesToBeMonitored;
export const setDataByTableSelector = (state: FalakState) => state.setDataByTable;
export const dataByTableSelector = (state: FalakState) => state.dataByTable;
export const setIsConnectedSelector = (state: FalakState) => state.setIsConnected;
export const isConnectedSelector = (state: FalakState) => state.isConnected;

export const tablesToMonitorSelector = (state: FalakState) => state.tablesToMonitor;
