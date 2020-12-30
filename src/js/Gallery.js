export default class Gallery {
  constructor(form, picsContainer) {
    this.form = form;
    this.picsContainer = picsContainer;
    this.contentArray = [];
  }

  init() {
    this.addContainer();
    this.addForm();
    this.addPicture();
    this.addListener();
  }

  addContainer() {
    this.pictureContainer = document.createElement('div');
    this.pictureContainer.classList.add('pics-container');

    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.appendChild(this.pictureContainer);

    this.body = document.querySelector('body');
    this.body.insertBefore(this.container, this.body.childNodes[0]);
  }

  addListener() {
    const btn = document.querySelector('.btn-submit');
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!this.fieldTitle.value) {
        Gallery.showMessage('Нужно заполнить поле', this.fieldTitle);
        return;
      }

      const img = document.createElement('img');
      img.src = this.fieldUrl.value;
      img.alt = this.fieldTitle.value;

      img.onerror = () => Gallery.showMessage('Неверный URL изображения', this.fieldUrl);

      img.onload = () => {
        img.classList.add('pic');

        const container = this.picsContainer.getContainer();
        container.classList.remove('empty');
        container.appendChild(img);
        this.contentArray.push(container);

        this.fieldUrl.value = '';
        this.fieldTitle.value = '';

        this.addPicture();
      };
    });
  }

  addForm() {
    this.container.insertBefore(this.form.getForm(), this.container.childNodes[0]);

    this.fieldTitle = document.querySelector('.field-title');
    this.fieldUrl = document.querySelector('.field-url');
  }

  static showMessage(message, element) {
    const hint = element.nextElementSibling;
    hint.textContent = message;
    hint.style.left = `${element.getBoundingClientRect().left}px`;
    hint.style.top = `${element.getBoundingClientRect().top - 30}px`;

    setTimeout(() => {
      hint.textContent = '';
      hint.removeAttribute('style');
    }, 2000);
  }

  addPicture() {
    this.cleanPictureContainer();

    this.contentArray.forEach((e) => {
      this.pictureContainer.appendChild(e);
    });

    this.addEmptyPicture();
  }

  cleanPictureContainer() {
    this.pictureContainer.innerHTML = '';
  }

  addEmptyPicture() {
    while (this.pictureContainer.childNodes.length < 2) {
      this.pictureContainer.appendChild(this.picsContainer.getContainer());
    }
    this.pictureContainer.appendChild(this.picsContainer.getContainer());
  }
}
