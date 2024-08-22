// client/src/rendering/ForestManager.ts
import * as THREE from 'three';
import { AssetManager } from '../core/AssetManager';
import { ForestObjectData } from '../../../shared/types';

export class ForestManager {
  private objectInstances: Map<string, THREE.InstancedMesh[]> = new Map();
  private chunkObjects: Map<string, THREE.Object3D[]> = new Map();

  constructor(
    private scene: THREE.Scene,
    private assetManager: AssetManager,
  ) {}

  public async initialize(): Promise<void> {
    const forestObjectTypes = ['tree', 'bush', 'rock']; // Примерный список типов
    for (const type of forestObjectTypes) {
      const model = this.assetManager.getModel(type);
      if (model) {
        const instancedMeshes = this.createInstancedMeshes(model, 1000); // Максимальное количество инстансов
        this.objectInstances.set(type, instancedMeshes);
        instancedMeshes.forEach((mesh) => this.scene.add(mesh));
      } else {
        console.warn(`Model for ${type} not found in AssetManager`);
      }
    }
  }

  private createInstancedMeshes(model: THREE.Group, maxInstances: number): THREE.InstancedMesh[] {
    const instancedMeshes: THREE.InstancedMesh[] = [];
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const instancedMesh = new THREE.InstancedMesh(child.geometry, child.material, maxInstances);
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        instancedMesh.count = 0;
        instancedMeshes.push(instancedMesh);
      }
    });
    return instancedMeshes;
  }

  public generateChunk(chunkX: number, chunkZ: number, forestObjects: ForestObjectData[]): void {
    const chunkKey = `${chunkX},${chunkZ}`;
    const chunkObjectList: THREE.Object3D[] = [];

    forestObjects.forEach((objData) => {
      const instancedMeshes = this.objectInstances.get(objData.type);
      if (instancedMeshes) {
        const matrix = new THREE.Matrix4()
          .makeRotationY(objData.rotation)
          .scale(new THREE.Vector3(objData.scale, objData.scale, objData.scale))
          .setPosition(objData.position.x, objData.position.y, objData.position.z);

        instancedMeshes.forEach((mesh) => {
          if (mesh.count < mesh.instanceMatrix.count) {
            mesh.setMatrixAt(mesh.count, matrix);
            mesh.count++;
            chunkObjectList.push(mesh);
          }
        });
      }
    });

    this.chunkObjects.set(chunkKey, chunkObjectList);
    this.objectInstances.forEach((meshes) => {
      meshes.forEach((mesh) => (mesh.instanceMatrix.needsUpdate = true));
    });
  }

  public removeChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = `${chunkX},${chunkZ}`;
    const objectsToRemove = this.chunkObjects.get(chunkKey);
    if (objectsToRemove) {
      objectsToRemove.forEach((obj) => {
        if (obj instanceof THREE.InstancedMesh) {
          obj.count--;
        }
      });
      this.chunkObjects.delete(chunkKey);
    }
  }

  public update(camera: THREE.Camera, playerPosition: THREE.Vector3): void {
    // Можно добавить логику для оптимизации рендеринга,
    // например, скрывать объекты, которые находятся слишком далеко от игрока
  }
}
