export const gameConfig = {
  // World settings
  worldWidth: 1024,
  worldDepth: 1024,

  // Chunk settings
  chunkSize: 16,
  renderDistance: 8,

  // Terrain generation settings
  terrainScale: 0.01,
  terrainAmplitude: 100,
  terrainOctaves: 6,
  terrainPersistence: 0.5,
  terrainLacunarity: 2.0,

  // Player settings
  playerMoveSpeed: 5,
  playerRunSpeed: 10,
  playerJumpForce: 5,
  playerGravity: -9.8,
  playerHeight: 1.8,

  // Camera settings
  cameraFOV: 75,
  cameraNear: 0.1,
  cameraFar: 1000,

  // Lighting settings
  ambientLightIntensity: 0.3,
  sunLightIntensity: 1.0,
  skyLightIntensity: 0.5,

  // Forest object settings
  treeSpawnChance: 0.001,
  deadTreeSpawnChance: 0.0001,
  bushSpawnChance: 0.0001,
  rockSpawnChance: 0.0001,
  flowerSpawnChance: 0.0001,
  grassSpawnChance: 0.0001,
  
  // Grass settings
  grassDensity: 100,
  grassRenderDistance: 50,

  // Networking settings
  serverTickRate: 20,
  clientUpdateRate: 60,

  // Graphics settings
  shadowMapSize: 2048,

  renderer: {
    exposure: 0.5,
  },
};

export type GameConfig = typeof gameConfig;
