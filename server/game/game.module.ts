import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { TerrainService } from './terrain.service';
import { PlayerService } from './player.service';

@Module({
  providers: [GameGateway, GameService, TerrainService, PlayerService],
})
export class GameModule {}
