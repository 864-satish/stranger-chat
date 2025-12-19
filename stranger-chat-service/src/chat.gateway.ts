import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private waitingUsers: Socket[] = [];
  private activeChats: Map<string, string> = new Map(); // socketId to partner socketId
  private usernames: Map<string, string> = new Map(); // socketId to username
  private connectedUsers: number = 0;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedUsers++;
    this.emitUserCount();
    // Wait for join message to get username
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers--;
    this.emitUserCount();
    this.removeFromWaiting(client);
    this.disconnectChat(client);
    this.usernames.delete(client.id);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket) {
    this.usernames.set(client.id, data.username);
    this.addToWaiting(client);
  }

  private addToWaiting(client: Socket) {
    if (this.waitingUsers.length > 0) {
      const partner = this.waitingUsers.shift();
      this.activeChats.set(client.id, partner.id);
      this.activeChats.set(partner.id, client.id);
      const clientUsername = this.usernames.get(client.id);
      const partnerUsername = this.usernames.get(partner.id);
      client.emit('matched', { partnerUsername });
      partner.emit('matched', { partnerUsername: clientUsername });
    } else {
      this.waitingUsers.push(client);
      client.emit('waiting');
    }
  }

  private removeFromWaiting(client: Socket) {
    const index = this.waitingUsers.indexOf(client);
    if (index > -1) {
      this.waitingUsers.splice(index, 1);
    }
  }

  private disconnectChat(client: Socket) {
    const partnerId = this.activeChats.get(client.id);
    if (partnerId) {
      const partner = this.server.sockets.sockets.get(partnerId);
      if (partner) {
        partner.emit('partnerDisconnected');
        this.activeChats.delete(partnerId);
      }
      this.activeChats.delete(client.id);
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const partnerId = this.activeChats.get(client.id);
    if (partnerId) {
      const partner = this.server.sockets.sockets.get(partnerId);
      if (partner) {
        const senderUsername = this.usernames.get(client.id);
        partner.emit('message', { text: data, senderUsername });
      }
    }
  }

  private emitUserCount() {
    this.server.emit('userCount', { count: this.connectedUsers });
  }
}