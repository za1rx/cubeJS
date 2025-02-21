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

const accordion = document.querySelector('.accordion')
let side = 'right';

accordion.addEventListener('click', event => {
  if(event.target.dataset.side){
    side = event.target.dataset.side;
    
  }
})

function changeFront() {
  const header = document.querySelector(`[data-side="${side}"]`);

  const content = header.nextElementSibling;

  const r = content.querySelector('#range-r').value;
  const g = content.querySelector('#range-g').value;
  const b = content.querySelector('#range-b').value;
  const o = content.querySelector('#range-o').value;

  // Получаем активную сторону
  const sideActive = document.querySelector(`.${side}`);

  sideActive.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${o})`;
}


const inputs = document.querySelectorAll('.accordion-content form input')

inputs.forEach(inp => {
  inp.addEventListener('input', changeFront)
})

