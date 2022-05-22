import { FalakState } from './store';

export const setTablesToBeMonitoredSelector = (state: FalakState) => state.setTablesToBeMonitored;
export const setDataByTableSelector = (state: FalakState) => state.setDataByTable;
export const dataByTableSelector = (state: FalakState) => state.dataByTable;

export const tablesToMonitorSelector = (state: FalakState) => state.tablesToMonitor;
