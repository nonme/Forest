import * as THREE from 'three';

export interface ISkyRenderer {
  initialize(): Promise<void>;
  update(camera: THREE.Camera): void;
  getSunPosition(): THREE.Vector3;
  setSunPosition(elevation: number, azimuth: number): void;
}
