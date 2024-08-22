import { gameConfig } from '../../../shared/gameConfig';

const models = Object.freeze([
  {
    name: 'CommonTree_1',
    path: 'models/CommonTree_1.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'CommonTree_2',
    path: 'models/CommonTree_2.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'CommonTree_3',
    path: 'models/CommonTree_3.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'CommonTree_4',
    path: 'models/CommonTree_4.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'CommonTree_5',
    path: 'models/CommonTree_5.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'DeadTree_1',
    path: 'models/DeadTree_1.gltf',
    scale: 1,
    spawnChance: gameConfig.deadTreeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'DeadTree_2',
    path: 'models/DeadTree_2.gltf',
    scale: 1,
    spawnChance: gameConfig.deadTreeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'DeadTree_3',
    path: 'models/DeadTree_3.gltf',
    scale: 1,
    spawnChance: gameConfig.deadTreeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'DeadTree_4',
    path: 'models/DeadTree_4.gltf',
    scale: 1,
    spawnChance: gameConfig.deadTreeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'DeadTree_5',
    path: 'models/DeadTree_5.gltf',
    scale: 1,
    spawnChance: gameConfig.deadTreeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Pine_1',
    path: 'models/Pine_1.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Pine_2',
    path: 'models/Pine_2.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Pine_3',
    path: 'models/Pine_3.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Pine_4',
    path: 'models/Pine_4.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Pine_5',
    path: 'models/Pine_5.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'TwistedTree_1',
    path: 'models/TwistedTree_1.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'TwistedTree_2',
    path: 'models/TwistedTree_2.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'TwistedTree_3',
    path: 'models/TwistedTree_3.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'TwistedTree_4',
    path: 'models/TwistedTree_4.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'TwistedTree_5',
    path: 'models/TwistedTree_5.gltf',
    scale: 1,
    spawnChance: gameConfig.treeSpawnChance,
    minHeight: 0.5,
    maxHeight: Infinity,
  },
  {
    name: 'Bush_Common',
    path: 'models/Bush_Common.gltf',
    scale: 0.5,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 10,
  },
  {
    name: 'Bush_Common_Flowers',
    path: 'models/Bush_Common_Flowers.gltf',
    scale: 0.5,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 10,
  },
  {
    name: 'Grass_Common_Short',
    path: 'models/Grass_Common_Short.gltf',
    scale: 0.3,
    spawnChance: gameConfig.grassSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Grass_Common_Tall',
    path: 'models/Grass_Common_Tall.gltf',
    scale: 0.3,
    spawnChance: gameConfig.grassSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Grass_Wispy_Short',
    path: 'models/Grass_Wispy_Short.gltf',
    scale: 0.3,
    spawnChance: gameConfig.grassSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Grass_Wispy_Tall',
    path: 'models/Grass_Wispy_Tall.gltf',
    scale: 0.3,
    spawnChance: gameConfig.grassSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Flower_3_Group',
    path: 'models/Flower_3_Group.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Flower_3_Single',
    path: 'models/Flower_3_Single.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Flower_4_Group',
    path: 'models/Flower_4_Group.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Flower_4_Single',
    path: 'models/Flower_4_Single.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Rock_Medium_1',
    path: 'models/Rock_Medium_1.gltf',
    scale: 0.7,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Rock_Medium_2',
    path: 'models/Rock_Medium_2.gltf',
    scale: 0.7,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Rock_Medium_3',
    path: 'models/Rock_Medium_3.gltf',
    scale: 0.7,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Round_1',
    path: 'models/Pebble_Round_1.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Round_2',
    path: 'models/Pebble_Round_2.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Round_3',
    path: 'models/Pebble_Round_3.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Round_4',
    path: 'models/Pebble_Round_4.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Round_5',
    path: 'models/Pebble_Round_5.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_1',
    path: 'models/Pebble_Square_1.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_2',
    path: 'models/Pebble_Square_2.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_3',
    path: 'models/Pebble_Square_3.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_4',
    path: 'models/Pebble_Square_4.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_5',
    path: 'models/Pebble_Square_5.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Pebble_Square_6',
    path: 'models/Pebble_Square_6.gltf',
    scale: 0.2,
    spawnChance: gameConfig.rockSpawnChance,
    minHeight: 0,
    maxHeight: 20,
  },
  {
    name: 'Clover_1',
    path: 'models/Clover_1.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Clover_2',
    path: 'models/Clover_2.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 12,
  },
  {
    name: 'Fern_1',
    path: 'models/Fern_1.gltf',
    scale: 0.3,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Mushroom_Common',
    path: 'models/Mushroom_Common.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 10,
  },
  {
    name: 'Mushroom_Laetiporus',
    path: 'models/Mushroom_Laetiporus.gltf',
    scale: 0.2,
    spawnChance: gameConfig.flowerSpawnChance,
    minHeight: 0,
    maxHeight: 10,
  },
  {
    name: 'Plant_1',
    path: 'models/Plant_1.gltf',
    scale: 0.3,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Plant_1_Big',
    path: 'models/Plant_1_Big.gltf',
    scale: 0.5,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Plant_7',
    path: 'models/Plant_7.gltf',
    scale: 0.3,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
  {
    name: 'Plant_7_Big',
    path: 'models/Plant_7_Big.gltf',
    scale: 0.5,
    spawnChance: gameConfig.bushSpawnChance,
    minHeight: 0,
    maxHeight: 15,
  },
]);

interface TextureData {
  name: string;
  path: string;
}

const textures: TextureData[] = [
  { name: 'Bark_DeadTree', path: 'textures/Bark_DeadTree.png' },
  { name: 'Bark_DeadTree_Normal', path: 'textures/Bark_DeadTree_Normal.png' },
  { name: 'Bark_NormalTree', path: 'textures/Bark_NormalTree.png' },
  { name: 'Bark_NormalTree_Normal', path: 'textures/Bark_NormalTree_Normal.png' },
  { name: 'Bark_TwistedTree', path: 'textures/Bark_TwistedTree.png' },
  { name: 'Bark_TwistedTree_Normal', path: 'textures/Bark_TwistedTree_Normal.png' },
  { name: 'Flowers', path: 'textures/Flowers.png' },
  { name: 'Grass', path: 'textures/Grass.png' },
  { name: 'GrassAlpha', path: 'textures/blade_alpha.jpg' },
  { name: 'GrassDiffuse', path: 'textures/grass_diffuse.jpg' },
  { name: 'Leaf_Pine', path: 'textures/Leaf_Pine.png' },
  { name: 'Leaf_Pine_C', path: 'textures/Leaf_Pine_C.png' },
  { name: 'Leaves', path: 'textures/Leaves.png' },
  { name: 'Leaves_GiantPine_C', path: 'textures/Leaves_GiantPine_C.png' },
  { name: 'Leaves_NormalTree', path: 'textures/Leaves_NormalTree.png' },
  { name: 'Leaves_NormalTree_C', path: 'textures/Leaves_NormalTree_C.png' },
  { name: 'Leaves_TwistedTree', path: 'textures/Leaves_TwistedTree.png' },
  { name: 'Leaves_TwistedTree_C', path: 'textures/Leaves_TwistedTree_C.png' },
  { name: 'Mushrooms', path: 'textures/Mushrooms.png' },
  { name: 'PathRocks_Diffuse', path: 'textures/PathRocks_Diffuse.png' },
  { name: 'Rocks_Desert_Diffuse', path: 'textures/Rocks_Desert_Diffuse.png' },
  { name: 'Rocks_Diffuse', path: 'textures/Rocks_Diffuse.png' },
];

export const FOREST_OBJECTS_DATA = {
  models,
  textures,
};