import * as THREE from 'three';
import { TerrainGenerator } from './TerrainGenerator';
import { AssetManager } from '../core/AssetManager';
import { gameConfig } from '../config/gameConfig';

export class GrassSystem {
  private geometry: THREE.InstancedBufferGeometry;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.InstancedMesh;

  constructor(
    private terrain: TerrainGenerator,
    private assetManager: AssetManager,
  ) {}

  public async initialize(): Promise<void> {
    await this.createMaterial();
    this.createGeometry();
    this.createMesh();
  }

  private async createMaterial(): Promise<void> {
    const bladeDiffuse = this.assetManager.getTexture('GrassDiffuse');
    const bladeAlpha = this.assetManager.getTexture('GrassAlpha');

    if (!bladeDiffuse || !bladeAlpha) {
      throw new Error('Grass textures not found');
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        bladeDiffuse: { value: bladeDiffuse },
        bladeAlpha: { value: bladeAlpha },
        playerPosition: { value: new THREE.Vector3() },
        renderDistance: { value: gameConfig.grassRenderDistance },
      },
      vertexShader: `
        uniform float time;
        uniform vec3 playerPosition;
        uniform float renderDistance;
        attribute vec3 offset;
        attribute float scale;
        varying vec2 vUv;
        varying float vVisibility;

        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y *= scale;
          pos += offset;
          pos.x += sin(time + offset.x * 0.05) * 0.2;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float distance = length(playerPosition - pos);
          vVisibility = smoothstep(renderDistance, renderDistance * 0.8, distance);
        }
      `,
      fragmentShader: `
        uniform sampler2D bladeDiffuse;
        uniform sampler2D bladeAlpha;
        varying vec2 vUv;
        varying float vVisibility;

        void main() {
          vec4 diffuseColor = texture2D(bladeDiffuse, vUv);
          float alpha = texture2D(bladeAlpha, vUv).r;
          if (alpha < 0.5) discard;
          gl_FragColor = vec4(diffuseColor.rgb, diffuseColor.a * vVisibility);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    });
  }

  private createGeometry(): void {
    const bladeWidth = gameConfig.grassBladeWidth;
    const bladeHeight = gameConfig.grassBladeHeight;
    const bladePlane = new THREE.PlaneGeometry(
      bladeWidth,
      bladeHeight,
      1,
      gameConfig.grassSegments,
    );
    bladePlane.translate(0, bladeHeight / 2, 0);

    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.index = bladePlane.index;
    this.geometry.attributes = bladePlane.attributes;

    const instanceCount = Math.floor(
      gameConfig.worldWidth * gameConfig.worldDepth * gameConfig.grassDensity,
    );

    const offsets = new Float32Array(instanceCount * 3);
    const scales = new Float32Array(instanceCount);

    for (let i = 0; i < instanceCount; i++) {
      const x = (Math.random() - 0.5) * gameConfig.worldWidth;
      const z = (Math.random() - 0.5) * gameConfig.worldDepth;
      const y = this.terrain.getHeightAt(x, z);

      offsets[i * 3] = x;
      offsets[i * 3 + 1] = y;
      offsets[i * 3 + 2] = z;

      scales[i] = 0.5 + Math.random() * 0.5;
    }

    this.geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
    this.geometry.setAttribute('scale', new THREE.InstancedBufferAttribute(scales, 1));
  }

  private createMesh(): void {
    const instanceCount = Math.floor(
      gameConfig.worldWidth * gameConfig.worldDepth * gameConfig.grassDensity,
    );
    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, instanceCount);
    this.mesh.frustumCulled = false;
  }

  public getMesh(): THREE.InstancedMesh {
    return this.mesh;
  }

  public update(time: number, playerPosition: THREE.Vector3): void {
    if (this.material) {
      this.material.uniforms.time.value = time;
      this.material.uniforms.playerPosition.value.copy(playerPosition);
    }
  }
}
