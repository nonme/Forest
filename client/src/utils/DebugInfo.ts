import * as THREE from 'three';

export class DebugInfo {
  private container: HTMLDivElement;
  private infoText: HTMLParagraphElement;
  private isVisible: boolean = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '10px';
    this.container.style.left = '10px';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.container.style.color = 'white';
    this.container.style.padding = '10px';
    this.container.style.fontFamily = 'monospace';
    this.container.style.fontSize = '12px';
    this.container.style.display = 'none';

    this.infoText = document.createElement('p');
    this.container.appendChild(this.infoText);

    document.body.appendChild(this.container);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'h' || event.key === 'H') {
        this.toggleVisibility();
      }
    });
  }

  public update(player: THREE.Object3D, fps: number): void {
    const position = player.position;
    this.infoText.innerHTML = `
      Player Position: X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(2)}, Z: ${position.z.toFixed(2)}
      FPS: ${fps}
    `;
  }

  private toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.container.style.display = this.isVisible ? 'block' : 'none';
  }
}
