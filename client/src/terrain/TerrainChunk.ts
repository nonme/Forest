import * as THREE from 'three';

export class TerrainChunk {
  private mesh: THREE.Mesh;
  private grassMesh: THREE.InstancedMesh;

  constructor(
    private chunkX: number,
    private chunkZ: number,
    heightMap: number[],
    grassySurface: boolean[],
    private chunkSize: number,
  ) {
    this.createTerrainMesh(heightMap);
    this.createGrassMesh(grassySurface);
  }

  private createTerrainMesh(heightMap: number[]): void {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    for (let z = 0; z <= this.chunkSize; z++) {
      for (let x = 0; x <= this.chunkSize; x++) {
        const worldX = this.chunkX * this.chunkSize + x;
        const worldZ = this.chunkZ * this.chunkSize + z;
        const height = heightMap[z * this.chunkSize + x] || 0;
        vertices.push(worldX, height, worldZ);
      }
    }

    for (let z = 0; z < this.chunkSize; z++) {
      for (let x = 0; x < this.chunkSize; x++) {
        const topLeft = z * (this.chunkSize + 1) + x;
        const topRight = topLeft + 1;
        const bottomLeft = (z + 1) * (this.chunkSize + 1) + x;
        const bottomRight = bottomLeft + 1;

        indices.push(topLeft, bottomLeft, topRight);
        indices.push(bottomLeft, bottomRight, topRight);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
  }

  private createGrassMesh(grassySurface: boolean[]): void {
    const grassGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    grassGeometry.rotateX(-Math.PI / 2);
    const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

    const instanceCount = grassySurface.filter(Boolean).length;
    this.grassMesh = new THREE.InstancedMesh(grassGeometry, grassMaterial, instanceCount);

    let instanceIndex = 0;
    for (let z = 0; z < this.chunkSize; z++) {
      for (let x = 0; x < this.chunkSize; x++) {
        if (grassySurface[z * this.chunkSize + x]) {
          const worldX = this.chunkX * this.chunkSize + x;
          const worldZ = this.chunkZ * this.chunkSize + z;
          const height = this.getHeightAt(x, z);

          const matrix = new THREE.Matrix4().setPosition(worldX, height, worldZ);
          this.grassMesh.setMatrixAt(instanceIndex, matrix);
          instanceIndex++;
        }
      }
    }

    this.grassMesh.instanceMatrix.needsUpdate = true;
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }

  public getGrassMesh(): THREE.InstancedMesh {
    return this.grassMesh;
  }

  public getHeightAt(x: number, z: number): number {
    return (this.mesh.geometry.attributes.position as THREE.BufferAttribute).getY(
      z * (this.chunkSize + 1) + x,
    );
  }
}
