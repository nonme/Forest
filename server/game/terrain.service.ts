import { Injectable } from '@nestjs/common';
import { createNoise2D } from 'simplex-noise';

@Injectable()
export class TerrainService {
  private noise2D = createNoise2D();

  generateChunk(chunkX: number, chunkZ: number) {
    const chunkSize = 16;
    const heightMap = [];
    const grassySurface = [];

    for (let z = 0; z < chunkSize; z++) {
      for (let x = 0; x < chunkSize; x++) {
        const worldX = chunkX * chunkSize + x;
        const worldZ = chunkZ * chunkSize + z;
        const height = this.generateHeight(worldX, worldZ);
        heightMap.push(height);
        grassySurface.push(this.isGrassySurface(worldX, worldZ, height));
      }
    }

    return { heightMap, grassySurface };
  }

  private generateHeight(x: number, z: number): number {
    const scale = 0.01;
    return (this.noise2D(x * scale, z * scale) + 1) * 50;
  }

  private isGrassySurface(x: number, z: number, height: number): boolean {
    // Implement logic to determine if the surface should be grassy
    return height < 40 && height > 20;
  }
}
