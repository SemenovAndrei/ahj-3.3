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
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-delete')) { this.deletePicture(e); }
    });

    const btnSubmit = document.querySelector('.btn-submit');
    btnSubmit.addEventListener('click', (e) => {
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

        const container = {
          title: this.fieldTitle.value,
          url: this.fieldUrl.value,
          node: this.picsContainer.getContainer(),
        };
        container.node.classList.remove('empty');
        container.node.appendChild(img);
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
      this.pictureContainer.appendChild(e.node);
    });

    this.addEmptyPicture();
  }

  deletePicture(e) {
    e.preventDefault();

    const parent = e.target.closest('.pic-container');
    const elementToDelete = parent.querySelector('img');

    if (elementToDelete) {
      this.contentArray = this.contentArray.filter((el) => el.url !== elementToDelete.src);
    }
    this.addPicture();
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
