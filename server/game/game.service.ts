import { Injectable } from '@nestjs/common';
import { TerrainService } from './terrain.service';

@Injectable()
export class GameService {
  constructor(private readonly terrainService: TerrainService) {}

  getChunk(x: number, z: number) {
    return this.terrainService.generateChunk(x, z);
  }
}
