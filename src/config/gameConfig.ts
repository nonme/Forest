export const gameConfig = {
  // World settings
  worldWidth: 512,
  worldDepth: 512,
  renderDistance: 10,

  // Terrain settings
  terrainResolution: 256,
  terrainMaxHeight: 20,

  // Player settings
  playerMoveSpeed: 200,
  playerRunSpeed: 500,
  playerJumpSpeed: 200,
  playerGravity: 9.8,

  // Camera settings
  cameraFOV: 75,
  cameraNear: 0.1,
  cameraFar: 1000,

  // Lighting settings
  ambientLightIntensity: 0.5,
  sunLightIntensity: 1.0,
  skyLightIntensity: 0.5,

  // Forest object settings
  treeSpawnChance: 0.001,
  deadTreeSpawnChance: 0.0001,
  bushSpawnChance: 0.0001,
  grassSpawnChance: 0,
  flowerSpawnChance: 0,
  rockSpawnChance: 0.0001,

  // Grass settings
  grassDensity: 10, // Grass blades per square meter
  grassSegments: 4,
  grassBladeWidth: 0.03,
  grassBladeHeight: 0.6,
  grassRenderDistance: 50,

  // Other settings
  skyColor: 0x87ceeb,
  fogNear: 50,
  fogFar: 300,

  sky: {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 30,
    azimuth: 180,
  },

  renderer: {
    exposure: 0.5,
  },
};
