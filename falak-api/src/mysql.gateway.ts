import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MySQLGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  async handleConnection() {
    console.log('SOMEONE CONNECTED');
  }

  async handleDisconnect() {
    console.log('SOMEONE DISCONNECTED');
  }
}
