export interface ChunkData {
  heightMap: number[];
  grassySurface: boolean[];
  forestObjects: ForestObjectData[];
}

export interface ForestObjectData {
  type: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  scale: number;
}
