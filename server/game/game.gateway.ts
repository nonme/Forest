import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { PlayerService } from './player.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  handleConnection(client: Socket) {
    const player = this.playerService.createPlayer(client.id);
    client.emit('playerInfo', player);
  }

  handleDisconnect(client: Socket) {
    this.playerService.removePlayer(client.id);
  }

  @SubscribeMessage('requestChunk')
  handleRequestChunk(@MessageBody() data: { x: number; z: number }) {
    const chunk = this.gameService.getChunk(data.x, data.z);
    return chunk;
  }

  @SubscribeMessage('playerMove')
  handlePlayerMove(client: Socket, data: { x: number; y: number; z: number }) {
    this.playerService.updatePlayerPosition(client.id, data);
    client.broadcast.emit('playerMoved', { id: client.id, position: data });
  }
}
