import { io, Socket } from 'socket.io-client';
import { EventEmitter } from '../utils/EventEmitter';
import { Vector3 } from 'three';

export class NetworkManager extends EventEmitter {
  private socket: Socket;
  private playerInfo: any;

  constructor() {
    super();
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io('http://localhost:3001');
      this.socket.on('connect', () => {
        console.log('Connected to server');
        this.setupEventListeners();
        resolve();
      });
      this.socket.on('connect_error', (error) => {
        reject(error);
      });
    });
  }

  private setupEventListeners(): void {
    this.socket.on('playerInfo', (info) => {
      this.playerInfo = info;
      this.emit('playerInfoReceived', info);
    });

    this.socket.on('playerMoved', (data) => {
      this.emit('playerMoved', data);
    });
  }

  requestChunk(x: number, z: number): Promise<any> {
    return new Promise((resolve) => {
      this.socket.emit('requestChunk', { x, z }, resolve);
    });
  }

  updatePlayerPosition(position: { x: number; y: number; z: number }): void {
    this.socket.emit('playerMove', position);
  }

  getInitialPlayerPosition(): Vector3 {
    return new Vector3(
      this.playerInfo?.position?.x || 0,
      this.playerInfo?.position?.y || 50,
      this.playerInfo?.position?.z || 0,
    );
  }
}
