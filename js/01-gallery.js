import { galleryItems } from "./gallery-items.js";

// Change code below this line

// console.log(galleryItems);
/*
! Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
*/
//Находим ссылку, в которую нужно добавить нашу разметку
const listGallary = document.querySelector(".gallery");
//Создаем функцию для создания разметки
const makeGallaryCards = ({ preview, original, description }) => {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
};
//Перебираем массив с помощью метода map() и возвращаем массив созданных шаблонных строк
const galleryArray = galleryItems.map((el) => {
  return makeGallaryCards(el);
});
//добавляем в разметку шаблонные строки, перед этим их соединяем в одну строку методом join();
//так как метод insertAdjacentHTML() - работает с строкой
listGallary.insertAdjacentHTML("afterbegin", galleryArray.join(""));

/*
! Реализация делегирования на div.gallery и получение url большого изображения.
*/

const onlistGallaryClick = (event) => {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }
  let imgSRC = event.target.src;
  const linkHREF = event.target.parentNode.href;
  imgSRC = linkHREF;
  console.log("~ imgSRC", imgSRC);

  const instance = basicLightbox.create(`
    <img src="${linkHREF}" class="gallery__image"
>
`);

  instance.show();
};
listGallary.addEventListener("click", onlistGallaryClick);

/*
! Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
! Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
*/
