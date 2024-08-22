import * as THREE from 'three';
import { createNoise2D, NoiseFunction2D } from 'simplex-noise';
import { AssetManager } from '../core/AssetManager';

export class TerrainGenerator {
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private heightMap: number[][];
  private simplex: NoiseFunction2D;

  constructor(
    private width: number,
    private depth: number,
    private resolution: number,
    public maxHeight: number,
    private assetManager: AssetManager,
  ) {
    this.geometry = new THREE.BufferGeometry();
    this.simplex = createNoise2D();
    this.heightMap = this.generateHeightMap();
  }

  private generateHeightMap(): number[][] {
    const size = this.resolution + 1;
    const heightMap: number[][] = new Array(size).fill(null).map(() => new Array(size).fill(0));

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size - 0.5) * 2;
        const ny = (y / size - 0.5) * 2;
        let height = 0;
        height += this.simplex(nx * 1.5, ny * 1.5) * 0.5;
        height += this.simplex(nx * 3, ny * 3) * 0.25;
        height += this.simplex(nx * 6, ny * 6) * 0.125;
        height += this.simplex(nx * 12, ny * 12) * 0.0625;
        heightMap[y][x] = Math.max(0, Math.min(1, (height + 1) / 2));
      }
    }

    return heightMap;
  }

  private generateTerrain(): void {
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let z = 0; z <= this.resolution; z++) {
      for (let x = 0; x <= this.resolution; x++) {
        const u = x / this.resolution;
        const v = z / this.resolution;
        const worldX = (u - 0.5) * this.width;
        const worldZ = (v - 0.5) * this.depth;
        const height = this.heightMap[z][x] * this.maxHeight;

        vertices.push(worldX, height, worldZ);
        uvs.push(u, v);

        if (x < this.resolution && z < this.resolution) {
          const a = z * (this.resolution + 1) + x;
          const b = z * (this.resolution + 1) + x + 1;
          const c = (z + 1) * (this.resolution + 1) + x;
          const d = (z + 1) * (this.resolution + 1) + x + 1;
          indices.push(a, c, b);
          indices.push(c, d, b);
        }
      }
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);
    this.geometry.computeVertexNormals();
  }

  public async initialize(): Promise<void> {
    this.generateTerrain();
    this.createMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
  }

  private createMaterial(): void {
    const grassTexture = this.assetManager.getTexture('GrassDiffuse');
    if (grassTexture) {
      grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
      grassTexture.repeat.set(this.width / 10, this.depth / 10);
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        grassTexture: { value: grassTexture },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D grassTexture;
        varying vec2 vUv;
        void main() {
          vec3 color = texture2D(grassTexture, vUv).rgb;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }

  public getHeightAt(x: number, z: number): number {
    const normalizedX = (x / this.width + 0.5) * this.resolution;
    const normalizedZ = (z / this.depth + 0.5) * this.resolution;

    const cellX = Math.floor(normalizedX);
    const cellZ = Math.floor(normalizedZ);

    if (cellX < 0 || cellX >= this.resolution || cellZ < 0 || cellZ >= this.resolution) {
      return 0;
    }

    return this.heightMap[cellZ][cellX] * this.maxHeight;
  }

  public update(time: number, playerPosition: THREE.Vector3): void {
    if (this.material) {
      this.material.uniforms.time.value = time;
    }
  }
}
