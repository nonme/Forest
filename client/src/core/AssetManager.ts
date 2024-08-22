// client/src/core/AssetManager.ts
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FOREST_OBJECTS_DATA } from '../config/forestObjectData';

export class AssetManager {
  private static instance: AssetManager;
  private textures: Record<string, THREE.Texture> = {};
  private models: Record<string, THREE.Group> = {};
  private skyboxes: Record<string, THREE.Texture> = {};
  private textureLoader: THREE.TextureLoader;
  private modelLoader: GLTFLoader;

  private constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.modelLoader = new GLTFLoader();
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async loadAssets(
    onProgress: (itemName: string, percentage: number) => void,
  ): Promise<void> {
    const texturePromises = FOREST_OBJECTS_DATA.textures.map(async (texture) => {
      try {
        this.textures[texture.name] = await this.loadTexture(`/assets/${texture.path}`);
        onProgress(`Texture: ${texture.name}`, 100);
      } catch (error) {
        console.error(`Error loading texture ${texture.name}:`, error);
      }
    });

    const modelPromises = FOREST_OBJECTS_DATA.models.map(async (model) => {
      try {
        this.models[model.name] = await this.loadModel(`/assets/${model.path}`);
        onProgress(`Model: ${model.name}`, 100);
      } catch (error) {
        console.error(`Error loading model ${model.name}:`, error);
      }
    });

    const skyboxPromises = this.loadSkyboxes(onProgress);

    await Promise.all([...texturePromises, ...modelPromises, skyboxPromises]);
  }

  private async loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(path, resolve, undefined, reject);
    });
  }

  private async loadModel(path: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.modelLoader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          this.processModelMaterials(model);
          resolve(model);
        },
        undefined,
        reject,
      );
    });
  }

  private processModelMaterials(model: THREE.Object3D): void {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach(this.updateMaterial.bind(this));
        } else {
          this.updateMaterial(child.material);
        }
      }
    });
  }

  private updateMaterial(material: THREE.Material): void {
    if (material instanceof THREE.MeshStandardMaterial) {
      if (material.map && this.textures[material.map.name]) {
        material.map = this.textures[material.map.name];
      }
      if (material.normalMap && this.textures[material.normalMap.name]) {
        material.normalMap = this.textures[material.normalMap.name];
      }
      material.needsUpdate = true;
    }
  }

  private async loadSkyboxes(
    onProgress: (itemName: string, percentage: number) => void,
  ): Promise<void> {
    const skyboxFolder = 'assets/skyboxes/';
    const skyboxFiles = await this.getSkyboxFiles(skyboxFolder);

    const loadPromises = skyboxFiles.map(async (file) => {
      const name = file.split('.')[0];
      try {
        this.skyboxes[name] = await this.loadTexture(`${skyboxFolder}${file}`);
        onProgress(`Skybox: ${name}`, 100);
      } catch (error) {
        console.error(`Error loading skybox ${name}:`, error);
      }
    });

    await Promise.all(loadPromises);
  }

  private async getSkyboxFiles(folder: string): Promise<string[]> {
    // В реальном сценарии вам нужно будет реализовать способ получения списка файлов в папке skybox.
    // Пока мы вернем фиктивный список.
    return [
      'SkySkybox.png',
      'SunsetSky.png',
      'BlueSkySkybox.png',
      'FS000_Day_05_Sunless.png',
      'FS002_Day_Sunless.png',
    ];
  }

  public getTexture(name: string): THREE.Texture | undefined {
    return this.textures[name];
  }

  public getModel(name: string): THREE.Group | undefined {
    return this.models[name]?.clone();
  }

  public getSkybox(name: string): THREE.Texture | undefined {
    return this.skyboxes[name];
  }
}
