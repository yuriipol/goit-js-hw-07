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

! Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
! Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
*/
//Создаем функцию
const onlistGallaryClick = (event) => {
  event.preventDefault(); // делаем, чтобы страница не перезагружалась
  //делаем проверку на то, сто кликаем именно в тег IMG
  if (event.target.tagName !== "IMG") {
    return;
  }

  //обьявляем пернменные, чтобы найти src и href
  let imgSRC = event.target.src;
  const linkHREF = event.target.parentNode.href;
  //присваем значению src значение href
  imgSRC = linkHREF;
  //подключаем моальое окно из библиотеки  basicLightbox (до этого подключив скрипт js и css в index.html)
  const instance = basicLightbox.create(
    `
    <img src="${linkHREF}" class="gallery__image"
>
`, //вторым параметром добавляем обьект, в котором будет 2 функции
    {
      onShow: (instance) => {
        //вешаем слушателя событий на window
        window.addEventListener("keydown", onEscPressKey);
      },
      onClose: (instance) => {
        //убираем слушателя событий на window
        window.removeEventListener("keydown", onEscPressKey);
      },
    }
  );
  //вызов функции show()
  instance.show();
  //создаем функцию закрытия окна по Escape
  function onEscPressKey(event) {
    if (event.code === "Escape") {
      instance.close(); //вызов функции close()
    }
  }
};

//вешаем слушателя событий на div с классом class="gallery"
listGallary.addEventListener("click", onlistGallaryClick);
