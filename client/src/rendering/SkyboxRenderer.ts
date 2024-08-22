import * as THREE from 'three';
import { ISkyRenderer } from './interfaces/ISkyRenderer';
import { AssetManager } from '../core/AssetManager';

export class PanoramicalSkyboxRenderer implements ISkyRenderer {
  private sphere: THREE.Mesh;
  private sunPosition: THREE.Vector3;

  constructor(
    private scene: THREE.Scene,
    private assetManager: AssetManager,
  ) {
    this.sunPosition = new THREE.Vector3();
  }

  public async initialize(): Promise<void> {
    const skyboxTexture = this.assetManager.getSkybox('FS002_Day_Sunless');
    if (!skyboxTexture) {
      console.error('Skybox texture not found');
      return;
    }

    skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;
    skyboxTexture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: skyboxTexture,
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    this.scene.background = skyboxTexture;

    this.setSunPosition(0, 45);
  }

  public setSunPosition(azimuth: number, elevation: number): void {
    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    this.sunPosition.setFromSphericalCoords(500, phi, theta);
  }

  public getSunPosition(): THREE.Vector3 {
    return this.sunPosition.clone();
  }

  public update(camera: THREE.Camera): void {
    this.sphere.position.copy(camera.position);
  }
}
