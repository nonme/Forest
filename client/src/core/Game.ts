import * as THREE from 'three';
import { AssetManager } from './AssetManager';
import { WorldManager } from './WorldManager';
import { PlayerController } from '../entities/PlayerController';
import { LoadingScreen } from '../ui/LoadingScreen';
import { DebugInfo } from '../utils/DebugInfo';
import { NetworkManager } from './NetworkManager';
import { LightingManager } from '../rendering/LightingManager';
import { gameConfig } from 'shared/gameConfig';
import { PanoramicalSkyboxRenderer } from '@/rendering/SkyboxRenderer';

export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private assetManager: AssetManager;
  private worldManager: WorldManager;
  private player: PlayerController;
  private debugInfo: DebugInfo;
  private loadingScreen: LoadingScreen;
  private networkManager: NetworkManager;
  private skyRenderer: PanoramicalSkyboxRenderer;
  private lightingManager: LightingManager;
  private clock: THREE.Clock;

  constructor(private canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      gameConfig.cameraFOV,
      window.innerWidth / window.innerHeight,
      gameConfig.cameraNear,
      gameConfig.cameraFar,
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this.assetManager = AssetManager.getInstance();
    this.networkManager = new NetworkManager();
    this.skyRenderer = new PanoramicalSkyboxRenderer(this.scene, this.assetManager);
    this.lightingManager = new LightingManager(this.scene);
    this.worldManager = new WorldManager(
      this.scene,
      this.assetManager,
      this.networkManager,
      this.skyRenderer,
      this.lightingManager,
    );
    this.debugInfo = new DebugInfo();
    this.loadingScreen = new LoadingScreen();
    this.clock = new THREE.Clock();

    this.setupRenderer();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private setupRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = gameConfig.renderer.exposure;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  public async init(): Promise<void> {
    this.loadingScreen.setTotalItems(100); // Estimate total loading steps
    try {
      await this.assetManager.loadAssets((itemName, percentage) => {
        this.loadingScreen.incrementLoadedItems(`Loading ${itemName}`);
      });

      this.loadingScreen.incrementLoadedItems('Connecting to server');
      await this.networkManager.connect();

      this.loadingScreen.incrementLoadedItems('Setting up world');
      await this.skyRenderer.initialize();
      await this.worldManager.initialize();

      this.loadingScreen.incrementLoadedItems('Setting up player');
      this.player = new PlayerController(
        this.camera,
        this.renderer.domElement,
        this.worldManager,
        this.networkManager,
      );

      this.setupInitialPosition();
      this.loadingScreen.hide();
      this.animate();
    } catch (error) {
      console.error('Error during initialization:', error);
      this.loadingScreen.addError('Failed to initialize the game. Please refresh and try again.');
    }
  }

  private setupInitialPosition(): void {
    const initialPosition = this.networkManager.getInitialPlayerPosition();
    this.player.getObject().position.copy(initialPosition);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.player.update(delta);
    this.worldManager.update(this.camera, this.player.getObject().position, elapsedTime);
    this.updateDebugInfo();

    this.renderer.render(this.scene, this.camera);
  };

  private updateDebugInfo(): void {
    const fps = Math.round(1 / this.clock.getDelta());
    this.debugInfo.update(this.player.getObject(), fps);
  }
}
