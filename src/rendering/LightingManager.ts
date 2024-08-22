import * as THREE from 'three';
import { gameConfig } from '../config/gameConfig';

export class LightingManager {
  private sunLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private ambientLight: THREE.AmbientLight;

  constructor(private scene: THREE.Scene) {
    this.sunLight = new THREE.DirectionalLight();
    this.hemiLight = new THREE.HemisphereLight();
    this.ambientLight = new THREE.AmbientLight();
  }

  public initialize(initialSunPosition: THREE.Vector3): void {
    // Основной направленный свет (солнце)
    this.sunLight.color.setHSL(0.1, 1, 0.95);
    this.sunLight.intensity = gameConfig.sunLightIntensity;
    this.sunLight.position.copy(initialSunPosition);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 1;
    this.sunLight.shadow.camera.far = 500;
    this.sunLight.shadow.camera.left = -200;
    this.sunLight.shadow.camera.right = 200;
    this.sunLight.shadow.camera.top = 200;
    this.sunLight.shadow.camera.bottom = -200;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Полусферический свет
    this.hemiLight.color.setHSL(0.6, 1, 0.6);
    this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    this.hemiLight.intensity = gameConfig.skyLightIntensity;
    this.scene.add(this.hemiLight);

    // Рассеянный свет
    this.ambientLight.color.setHex(0x404040);
    this.ambientLight.intensity = gameConfig.ambientLightIntensity;
    this.scene.add(this.ambientLight);
  }

  public update(sunPosition: THREE.Vector3): void {
    this.sunLight.position.copy(sunPosition);

    // Здесь можно добавить дополнительную логику обновления освещения,
    // например, изменение интенсивности или цвета в зависимости от времени суток
  }

  public getSunDirection(): THREE.Vector3 {
    return this.sunLight.position.clone().normalize();
  }
}
