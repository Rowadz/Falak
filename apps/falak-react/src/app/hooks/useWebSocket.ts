import { useEffect } from 'react';
import constate from 'constate';
import { connect, Socket } from 'socket.io-client';
import {
  useStore,
  setDataByTableSelector,
  setIsConnectedSelector,
  setTableNamesSelector,
} from '../store';
import {
  NOTIFICATION,
  ALL_TABELS,
  AllTablesNames,
  FIND_ALL_DB_NOTIFICATION,
  WebSocketNotification,
} from '@falak/constants';

type FalakSocket = Socket<
  {
    [NOTIFICATION]: (data: WebSocketNotification | WebSocketNotification[]) => void;
    [ALL_TABELS]: (data: AllTablesNames) => void;
  },
  { [FIND_ALL_DB_NOTIFICATION]: any; [ALL_TABELS]: any }
>;

const useWebSocket = () => {
  const setDataByTable = useStore(setDataByTableSelector);
  const setIsConnected = useStore(setIsConnectedSelector);
  const setTableNames = useStore(setTableNamesSelector);

  useEffect(() => {
    const socket: FalakSocket = connect('http://localhost:3333', {
      transports: ['websocket'],
    });

    // TODO:: define NOTIFICATION type
    socket.on(NOTIFICATION, (data: WebSocketNotification | WebSocketNotification[]) => {
      if (Array.isArray(data)) {
        data.forEach(({ table, count, type }: WebSocketNotification) => {
          setDataByTable(table, type, count);
        });
      } else {
        // TODO:: subscribe to some tables only!
        setDataByTable(data.table, data.type);
      }
    });

    socket.emit(FIND_ALL_DB_NOTIFICATION);
    socket.emit(ALL_TABELS);

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on(ALL_TABELS, (tables: AllTablesNames) => {
      setTableNames(tables);
    });
    return () => {
      socket.close();
    };
  }, []);
};

export const [WebSocketContextProvider, useWebSocketContext] = constate(useWebSocket);
