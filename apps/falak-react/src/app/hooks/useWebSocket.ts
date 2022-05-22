import { useState, useEffect } from 'react';
import constate from 'constate';
import { connect } from 'socket.io-client';
import {
  useStore,
  setDataByTableSelector,
  tablesToMonitorSelector,
  setIsConnectedSelector,
} from '../store';
import { NOTIFICATION, ALL_TABELS, AallTables } from '@falak/constants';

const useWebSocket = () => {
  const [tables, setTables] = useState<string[]>();
  const setDataByTable = useStore(setDataByTableSelector);
  const tablesToMonitor = useStore(tablesToMonitorSelector);
  const setIsConnected = useStore(setIsConnectedSelector);

  useEffect(() => {
    const socket = connect('http://localhost:3333', {
      transports: ['websocket'],
    });

    // TODO:: define NOTIFICATION type
    socket.on(NOTIFICATION, (data) => {
      if (tablesToMonitor.includes(data.table)) {
        setDataByTable(data.table, data.type);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on(ALL_TABELS, (tables: AallTables) => {
      console.log(tables);
      setTables(tables.names);
    });
  }, [tablesToMonitor]);

  return { tables };
};

export const [WebSocketContextProvider, useWebSocketContext] = constate(useWebSocket);
