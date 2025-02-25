// Аккордеон

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    content.classList.toggle("active");

    // Закрываем другие
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.classList.remove("active");
      }
    });
  });
});

// Открытие сайдбара

const button = document.querySelector(".accordion-button");

button.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  button.classList.toggle("accordion-button__active");
  sidebar.classList.toggle("sidebar__active");
});

// Перекраска определённой грани

// Функция для обновления цвета

// function updateColor() {
//   const front = document.querySelector(".front");
//   front.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
// }

//   Добавляем обработчики событий для всех инпутов
//   document.querySelectorAll('input[type="range"]').forEach((input) => {
//     input.addEventListener("input", updateColor);
//   });

const accordion = document.querySelector('.accordion');
let side = 'right';

// Восстановление цветов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadColors();
});

// Слушатель нажатия, чтобы знать, какая грань активна
accordion.addEventListener('click', event => {
  if (event.target.dataset.side) {
    side = event.target.dataset.side;
  }
});

function changeFront() {
  const header = document.querySelector(`[data-side="${side}"]`);
  const content = header.nextElementSibling;

  // Получаем значения ползунков
  const r = content.querySelector('#range-r').value;
  const g = content.querySelector('#range-g').value;
  const b = content.querySelector('#range-b').value;
  const o = content.querySelector('#range-o').value;

  // Обновляем цвет активной грани
  const sideActive = document.querySelector(`.${side}`);
  const color = `rgba(${r}, ${g}, ${b}, ${o})`;
  sideActive.style.backgroundColor = color;

  // Сохраняем в localStorage
  saveColor(side, color);
}

// Функция для сохранения цвета в localStorage
function saveColor(side, color) {
  let colors = JSON.parse(localStorage.getItem('colors')) || {};
  colors[side] = color;
  localStorage.setItem('colors', JSON.stringify(colors));
}

// Функция для загрузки сохраненных цветов
function loadColors() {
  let colors = JSON.parse(localStorage.getItem('colors')) || {};
  
  for (let key in colors) {
    const sideElement = document.querySelector(`.${key}`);
    if (sideElement) {
      sideElement.style.backgroundColor = colors[key];
    }
  }
}

// Добавляем слушатели на изменение ползунков
const inputs = document.querySelectorAll('.accordion-content form input');
inputs.forEach(inp => {
  inp.addEventListener('input', changeFront);
});

// удаление текста

const checkBox = document.querySelector('#checkbox');

checkBox.addEventListener('input', () => {
  const sideText = document.querySelectorAll('.side');

  sideText.forEach(text => {
    if (checkBox.checked) {
      // Сохраняем оригинальный текст, если он ещё не сохранён
      if (!text.dataset.originalText) {
        text.dataset.originalText = text.textContent;
      }
      text.textContent = ''; // Очищаем текст
    } else {
      // Восстанавливаем текст из data-атрибута
      text.textContent = text.dataset.originalText || '';
    }
  });
});


