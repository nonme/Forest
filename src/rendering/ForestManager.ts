import * as THREE from 'three';
import { TerrainGenerator } from '../terrain/TerrainGenerator';
import { AssetManager } from '../core/AssetManager';
import { FOREST_OBJECTS_DATA } from '../config/forestObjectData';
import { gameConfig } from '../config/gameConfig';

export class ForestManager {
  private loadedChunks: Set<string> = new Set();
  private objectInstances: Map<string, THREE.InstancedMesh[]> = new Map();

  constructor(
    private scene: THREE.Scene,
    private terrain: TerrainGenerator,
    private assetManager: AssetManager,
  ) {}

  public async initialize(): Promise<void> {
    for (const modelData of FOREST_OBJECTS_DATA.models) {
      const model = this.assetManager.getModel(modelData.name);
      if (model) {
        const instancedMeshes = this.createInstancedMeshes(model, modelData);
        this.objectInstances.set(modelData.name, instancedMeshes);
        instancedMeshes.forEach((mesh) => this.scene.add(mesh));
      }
    }
  }

  private createInstancedMeshes(model: THREE.Group, modelData: any): THREE.InstancedMesh[] {
    const instancedMeshes: THREE.InstancedMesh[] = [];
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const instancedMesh = new THREE.InstancedMesh(child.geometry, child.material, 1000);
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        instancedMesh.castShadow = true;
        instancedMesh.receiveShadow = true;
        instancedMesh.count = 0;
        instancedMeshes.push(instancedMesh);
      }
    });
    return instancedMeshes;
  }

  private getRandomOffset(): number {
    return (Math.random() - 0.5) * 2;
  }

  public generateChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = `${chunkX},${chunkZ}`;
    if (this.loadedChunks.has(chunkKey)) return;

    const chunkSize = 16; // Assuming chunk size of 16x16

    for (const modelData of FOREST_OBJECTS_DATA.models) {
      const instancedMeshes = this.objectInstances.get(modelData.name);
      if (!instancedMeshes) continue;

      for (let x = 0; x < chunkSize; x++) {
        for (let z = 0; z < chunkSize; z++) {
          if (Math.random() < modelData.spawnChance) {
            const offsetX = this.getRandomOffset();
            const offsetZ = this.getRandomOffset();
            const worldX = chunkX * chunkSize + x + offsetX;
            const worldZ = chunkZ * chunkSize + z + offsetZ;
            const height = this.terrain.getHeightAt(worldX, worldZ);
            const normalizedHeight = height / this.terrain.maxHeight;

            if (
              normalizedHeight >= modelData.minHeight &&
              normalizedHeight <= modelData.maxHeight
            ) {
              const position = new THREE.Vector3(worldX, height, worldZ);
              const rotation = new THREE.Euler(0, Math.random() * Math.PI * 2, 0);
              const scale = modelData.scale * (0.8 + Math.random() * 0.4);

              const matrix = new THREE.Matrix4()
                .makeRotationFromEuler(rotation)
                .scale(new THREE.Vector3(scale, scale, scale))
                .setPosition(position);

              instancedMeshes.forEach((mesh) => {
                if (mesh.count < mesh.instanceMatrix.count) {
                  mesh.setMatrixAt(mesh.count, matrix);
                  mesh.count++;
                }
              });

              if (instancedMeshes[0].count >= instancedMeshes[0].instanceMatrix.count) {
                console.warn(`Max instances reached for ${modelData.name}`);
                break;
              }
            }
          }
        }
        if (instancedMeshes[0].count >= instancedMeshes[0].instanceMatrix.count) break;
      }

      instancedMeshes.forEach((mesh) => {
        mesh.instanceMatrix.needsUpdate = true;
      });
    }

    this.loadedChunks.add(chunkKey);
  }

  public update(camera: THREE.Camera, playerPosition: THREE.Vector3): void {
    const chunkSize = 16;
    const renderDistance = gameConfig.renderDistance;

    const centerChunkX = Math.floor(playerPosition.x / chunkSize);
    const centerChunkZ = Math.floor(playerPosition.z / chunkSize);

    for (let x = -renderDistance; x <= renderDistance; x++) {
      for (let z = -renderDistance; z <= renderDistance; z++) {
        this.generateChunk(centerChunkX + x, centerChunkZ + z);
      }
    }
  }
}
