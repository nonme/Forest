import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { WorldManager } from '../core/WorldManager';
import { NetworkManager } from '../core/NetworkManager';
import { gameConfig } from '../../../shared/gameConfig';

export class PlayerController {
  private controls: PointerLockControls;
  private velocity: THREE.Vector3;
  private movement: THREE.Vector3;
  private worldManager: WorldManager;
  private networkManager: NetworkManager;
  private keysPressed: Set<string> = new Set();

  constructor(
    camera: THREE.Camera,
    domElement: HTMLElement,
    worldManager: WorldManager,
    networkManager: NetworkManager,
  ) {
    this.controls = new PointerLockControls(camera, domElement);
    this.controls.pointerSpeed = 5;
    this.velocity = new THREE.Vector3();
    this.movement = new THREE.Vector3();
    this.worldManager = worldManager;
    this.networkManager = networkManager;

    this.controls.addEventListener('lock', () => console.log('Controls locked'));
    this.controls.addEventListener('unlock', () => console.log('Controls unlocked'));

    document.addEventListener('click', () => this.controls.lock());
    document.addEventListener('keydown', (event) => this.onKeyDown(event));
    document.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  public update(delta: number): void {
    if (this.controls.isLocked) {
      this.updateMovement();

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.add(this.movement.multiplyScalar(delta));

      this.controls.moveRight(this.velocity.x * delta);
      this.controls.moveForward(this.velocity.z * delta);

      const position = this.controls.getObject().position;
      position.y += this.velocity.y * delta;

      const terrainHeight = this.worldManager.getHeightAt(position.x, position.z);
      if (position.y < terrainHeight + 1.7) {
        position.y = terrainHeight + 1.7;
        this.velocity.y = 0;
      }

      this.networkManager.updatePlayerPosition(position);
    }
  }

  public getObject(): THREE.Object3D {
    return this.controls.getObject();
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.keysPressed.add(event.code);
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keysPressed.delete(event.code);
  }

  private updateMovement(): void {
    const speed = gameConfig.playerMoveSpeed;
    this.movement.set(0, 0, 0);

    if (this.keysPressed.has('KeyW')) this.movement.z += speed;
    if (this.keysPressed.has('KeyS')) this.movement.z -= speed;
    if (this.keysPressed.has('KeyA')) this.movement.x -= speed;
    if (this.keysPressed.has('KeyD')) this.movement.x += speed;

    if (this.keysPressed.has('Space')) {
      this.velocity.y = gameConfig.playerJumpForce;
    } else if (this.keysPressed.has('ShiftLeft')) {
      this.velocity.y = -gameConfig.playerJumpForce;
    } else {
      this.velocity.y = 0;
    }
  }
}
