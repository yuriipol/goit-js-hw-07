import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

/*
! Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи. 
! Используй готовый код из первого задания.
*/
//Находим ссылку, в которую нужно добавить нашу разметку
const listGallary = document.querySelector(".gallery");
//Создаем функцию для создания разметки
const makeGallaryCards = ({ preview, original, description }) => {
  return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
};
//Перебираем массив с помощью метода map() и возвращаем массив созданных шаблонных строк
const galleryArray = galleryItems.map((el) => {
  return makeGallaryCards(el);
});
//добавляем в разметку шаблонные строки, перед этим их соединяем в одну строку методом join();
//так как метод insertAdjacentHTML() - работает со строкой
listGallary.insertAdjacentHTML("afterbegin", galleryArray.join(""));

const onlistGallaryClick = (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") {
    return;
  }

  //обьявляем пернменные, чтобы найти src и href
  let imgSRC = event.target.src;
  const linkHREF = event.target.parentNode.href;
  //присваем значению src значение href
  imgSRC = linkHREF;

  var lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
};

//вешаем слушателя событий на div с классом class="gallery"
listGallary.addEventListener("click", onlistGallaryClick);
