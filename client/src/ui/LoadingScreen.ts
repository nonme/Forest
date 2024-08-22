export class LoadingScreen {
  private domElement: HTMLElement;
  private progressBar: HTMLElement;
  private statusText: HTMLElement;
  private errorList: HTMLElement;
  private totalItems: number = 0;
  private loadedItems: number = 0;
  private currentItem: string = '';

  constructor() {
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'fixed';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';
    this.domElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    this.domElement.style.display = 'flex';
    this.domElement.style.flexDirection = 'column';
    this.domElement.style.alignItems = 'center';
    this.domElement.style.justifyContent = 'center';
    this.domElement.style.color = 'white';
    this.domElement.style.fontFamily = 'Arial, sans-serif';

    this.statusText = document.createElement('div');
    this.statusText.style.marginBottom = '20px';
    this.domElement.appendChild(this.statusText);

    this.progressBar = document.createElement('div');
    this.progressBar.style.width = '50%';
    this.progressBar.style.height = '20px';
    this.progressBar.style.backgroundColor = '#333';
    this.progressBar.style.borderRadius = '10px';
    this.progressBar.style.overflow = 'hidden';
    this.domElement.appendChild(this.progressBar);

    const progressInner = document.createElement('div');
    progressInner.style.width = '0%';
    progressInner.style.height = '100%';
    progressInner.style.backgroundColor = '#4CAF50';
    progressInner.style.transition = 'width 0.3s';
    this.progressBar.appendChild(progressInner);

    this.errorList = document.createElement('ul');
    this.errorList.style.marginTop = '20px';
    this.errorList.style.color = '#ff6b6b';
    this.domElement.appendChild(this.errorList);

    document.body.appendChild(this.domElement);
  }

  public setTotalItems(total: number): void {
    this.totalItems = total;
    this.updateProgress();
  }

  public incrementLoadedItems(itemName: string): void {
    this.loadedItems++;
    this.currentItem = itemName;
    this.updateProgress();
  }

  private updateProgress(): void {
    const progress = this.totalItems > 0 ? (this.loadedItems / this.totalItems) * 100 : 0;
    const progressInner = this.progressBar.firstChild as HTMLElement;
    progressInner.style.width = `${Math.min(progress, 100)}%`;
    this.statusText.textContent = `Loading ${this.currentItem}... (${Math.min(Math.round(progress), 100)}%)`;
  }

  public addError(error: string): void {
    const errorItem = document.createElement('li');
    errorItem.textContent = error;
    this.errorList.appendChild(errorItem);
  }

  public hide(): void {
    this.domElement.style.display = 'none';
  }
}
