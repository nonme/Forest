import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  private players: Map<string, any> = new Map();

  createPlayer(id: string) {
    const player = {
      id,
      position: { x: 0, y: 50, z: 0 },
      name: `Player${Math.floor(Math.random() * 1000)}`,
    };
    this.players.set(id, player);
    return player;
  }

  removePlayer(id: string) {
    this.players.delete(id);
  }

  updatePlayerPosition(
    id: string,
    position: { x: number; y: number; z: number },
  ) {
    const player = this.players.get(id);
    if (player) {
      player.position = position;
    }
  }

  getAllPlayers() {
    return Array.from(this.players.values());
  }
}
