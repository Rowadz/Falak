import { useEffect, useState } from 'react';
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
  GET_ROW_TIMELINE,
  AllTablesNames,
  FIND_ALL_DB_NOTIFICATION,
  WebSocketNotification,
  TIMELINE,
  RowTimeline,
} from '@falak/constants';

type obj = Record<string | number, unknown>;

type FalakSocket = Socket<
  {
    [NOTIFICATION]: (data: WebSocketNotification | WebSocketNotification[]) => void;
    [ALL_TABELS]: (data: AllTablesNames) => void;
    [TIMELINE]: (data: RowTimeline[]) => void;
  },
  { [FIND_ALL_DB_NOTIFICATION]: obj; [ALL_TABELS]: obj; [GET_ROW_TIMELINE]: number }
>;

const useWebSocket = () => {
  const [socket, setSocket] = useState<FalakSocket | null>();

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

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return socket;
};

export const [WebSocketContextProvider, useWebSocketContext] = constate(useWebSocket);
