import * as THREE from 'three';
import { TerrainGenerator } from '../terrain/TerrainGenerator';
import { GrassSystem } from '../terrain/GrassSystem';
import { ForestManager } from '../rendering/ForestManager';
import { SkyRenderer } from '../rendering/SkyRenderer';
import { LightingManager } from '../rendering/LightingManager';
import { AssetManager } from './AssetManager';
import { gameConfig } from '../config/gameConfig';

export class WorldManager {
  private terrain: TerrainGenerator;
  private grassSystem: GrassSystem;
  private forestManager: ForestManager;
  private skyRenderer: SkyRenderer;
  private lightingManager: LightingManager;

  constructor(
    private scene: THREE.Scene,
    private assetManager: AssetManager,
  ) {
    this.terrain = new TerrainGenerator(
      gameConfig.worldWidth,
      gameConfig.worldDepth,
      gameConfig.terrainResolution,
      gameConfig.terrainMaxHeight,
      this.assetManager,
    );
    this.grassSystem = new GrassSystem(this.terrain, this.assetManager);
    this.forestManager = new ForestManager(this.scene, this.terrain, this.assetManager);
    this.skyRenderer = new SkyRenderer(this.scene, this.assetManager);
    this.lightingManager = new LightingManager(this.scene);
  }

  public async generateWorld(): Promise<void> {
    await this.terrain.initialize();
    this.scene.add(this.terrain.getMesh());

    await this.grassSystem.initialize();
    this.scene.add(this.grassSystem.getMesh());

    await this.forestManager.initialize();

    await this.skyRenderer.initialize();

    const initialSunPosition = this.skyRenderer.getSunPosition();
    this.lightingManager.initialize(initialSunPosition);
  }

  public update(camera: THREE.Camera, playerPosition: THREE.Vector3, elapsedTime: number): void {
    this.terrain.update(elapsedTime, playerPosition);
    this.grassSystem.update(elapsedTime, playerPosition);
    this.forestManager.update(camera, playerPosition);
    this.skyRenderer.update(camera);

    const sunPosition = this.skyRenderer.getSunPosition();
    this.lightingManager.update(sunPosition);
  }

  public getTerrain(): TerrainGenerator {
    return this.terrain;
  }
}
