import * as THREE from 'three';
import { AssetManager } from '../core/AssetManager';

export class SkyRenderer {
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

    // Настраиваем текстуру для корректного отображения на сферической геометрии
    skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;
    skyboxTexture.colorSpace = THREE.SRGBColorSpace;

    // Создаем геометрию сферы для skybox'а
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Инвертируем геометрию по оси X, чтобы все грани смотрели внутрь
    geometry.scale(-1, 1, 1);

    // Создаем материал с использованием загруженной текстуры
    const material = new THREE.MeshBasicMaterial({
      map: skyboxTexture,
    });

    // Создаем меш и добавляем его в сцену
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // Устанавливаем skybox как фон сцены
    this.scene.background = skyboxTexture;

    // Устанавливаем начальное положение солнца
    this.setSunPosition(0, 45); // Азимут 0, высота 45 градусов
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
    // Обновляем положение сферы в соответствии с положением камеры
    this.sphere.position.copy(camera.position);
  }
}
