import * as THREE from 'three';

export interface ILightingManager {
  initialize(initialSunPosition: THREE.Vector3): void;
  update(sunPosition: THREE.Vector3): void;
  getSunDirection(): THREE.Vector3;
}
