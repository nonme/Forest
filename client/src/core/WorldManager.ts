import * as THREE from 'three';
import { AssetManager } from './AssetManager';
import { NetworkManager } from './NetworkManager';
import { TerrainChunk } from '../terrain/TerrainChunk';
import { ForestManager } from '../rendering/ForestManager';
import { ISkyRenderer } from '../rendering/interfaces/ISkyRenderer';
import { ILightingManager } from '../rendering/interfaces/ILightingManager';
import { ChunkData } from '../../../shared/types';
import { gameConfig } from 'shared/gameConfig';

export class WorldManager {
  private chunks: Map<string, TerrainChunk> = new Map();
  private chunkGroup: THREE.Group;
  private forestManager: ForestManager;

  constructor(
    private scene: THREE.Scene,
    private assetManager: AssetManager,
    private networkManager: NetworkManager,
    private skyRenderer: ISkyRenderer,
    private lightingManager: ILightingManager,
  ) {
    this.chunkGroup = new THREE.Group();
    this.scene.add(this.chunkGroup);
    this.forestManager = new ForestManager(this.scene, this.assetManager);
  }

  public async initialize(): Promise<void> {
    if (!this.skyRenderer) {
      throw new Error('SkyRenderer is not initialized');
    }
    const initialSunPosition = this.skyRenderer.getSunPosition();
    this.lightingManager.initialize(initialSunPosition);
    await this.forestManager.initialize();
  }

  public update(camera: THREE.Camera, playerPosition: THREE.Vector3, elapsedTime: number): void {
    this.updateVisibleChunks(playerPosition);
    this.skyRenderer.update(camera);
    const sunPosition = this.skyRenderer.getSunPosition();
    this.lightingManager.update(sunPosition);
    this.forestManager.update(camera, playerPosition);
  }

  private updateVisibleChunks(playerPosition: THREE.Vector3): void {
    const chunkSize = gameConfig.chunkSize;
    const renderDistance = gameConfig.renderDistance;

    const centerChunkX = Math.floor(playerPosition.x / chunkSize);
    const centerChunkZ = Math.floor(playerPosition.z / chunkSize);

    for (let x = -renderDistance; x <= renderDistance; x++) {
      for (let z = -renderDistance; z <= renderDistance; z++) {
        const chunkX = centerChunkX + x;
        const chunkZ = centerChunkZ + z;
        const chunkKey = `${chunkX},${chunkZ}`;

        if (!this.chunks.has(chunkKey)) {
          this.loadChunk(chunkX, chunkZ);
        }
      }
    }

    // Unload chunks that are too far away
    for (const [key, chunk] of this.chunks.entries()) {
      const [x, z] = key.split(',').map(Number);
      if (
        Math.abs(x - centerChunkX) > renderDistance ||
        Math.abs(z - centerChunkZ) > renderDistance
      ) {
        this.unloadChunk(x, z);
      }
    }
  }

  private async loadChunk(chunkX: number, chunkZ: number): Promise<void> {
    const chunkData: ChunkData = await this.networkManager.requestChunk(chunkX, chunkZ);
    const chunk = new TerrainChunk(
      chunkX,
      chunkZ,
      chunkData.heightMap,
      chunkData.grassySurface,
      gameConfig.chunkSize,
    );

    this.chunks.set(`${chunkX},${chunkZ}`, chunk);
    this.chunkGroup.add(chunk.getMesh());
    this.chunkGroup.add(chunk.getGrassMesh());

    // Add forest objects for this chunk
    this.forestManager.generateChunk(chunkX, chunkZ, chunkData.forestObjects);
  }

  private unloadChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = `${chunkX},${chunkZ}`;
    const chunk = this.chunks.get(chunkKey);
    if (chunk) {
      this.chunkGroup.remove(chunk.getMesh());
      this.chunkGroup.remove(chunk.getGrassMesh());
      this.chunks.delete(chunkKey);
    }
    this.forestManager.removeChunk(chunkX, chunkZ);
  }

  public getHeightAt(x: number, z: number): number {
    const chunkSize = gameConfig.chunkSize;
    const chunkX = Math.floor(x / chunkSize);
    const chunkZ = Math.floor(z / chunkSize);
    const chunk = this.chunks.get(`${chunkX},${chunkZ}`);

    if (chunk) {
      const localX = x % chunkSize;
      const localZ = z % chunkSize;
      return chunk.getHeightAt(localX, localZ);
    }

    return 0; // Default height if chunk not loaded
  }
}
