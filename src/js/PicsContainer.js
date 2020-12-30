export default class PicsContainer {
  constructor() {
    this.container = null;
  }

  getContainer() {
    this.createContainer();

    return this.result;
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('pic-container', 'empty');
    container.innerHTML = PicsContainer.createMarkupContainer();

    this.result = container;
  }

  static createMarkupContainer() {
    return `
    <label class="label-btn">
      <button class="btn-delete">X</button>
      <div class="pic-delete"></div>
    </label>
    `;
  }
}
