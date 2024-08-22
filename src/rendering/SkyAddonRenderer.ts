import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { gameConfig } from '../config/gameConfig';

export class SkyAddonRenderer {
  private sky: Sky;
  private sun: THREE.Vector3;

  constructor(private readonly scene: THREE.Scene) {
    this.sky = new Sky();
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);
    this.sun = new THREE.Vector3();
    const uniforms = this.sky.material.uniforms;
    uniforms['turbidity'].value = gameConfig.sky.turbidity;
    uniforms['rayleigh'].value = gameConfig.sky.rayleigh;
    uniforms['mieCoefficient'].value = gameConfig.sky.mieCoefficient;
    uniforms['mieDirectionalG'].value = gameConfig.sky.mieDirectionalG;
    this.setSunPosition(gameConfig.sky.elevation, gameConfig.sky.azimuth);
  }

  public setSunPosition(elevation: number, azimuth: number) {
    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    this.sun.setFromSphericalCoords(100, phi, theta);
    this.onChanged();
  }

  private onChanged() {
    const uniforms = this.sky.material.uniforms;
    uniforms['sunPosition'].value.copy(this.sun);
  }

  public getSunPosition(): THREE.Vector3 {
    return this.sun.clone();
  }
}
