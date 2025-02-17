// Функция для обновления цвета
function updateColor() {
    const r = document.getElementById("red").value;
    const g = document.getElementById("green").value;
    const b = document.getElementById("blue").value;
    const opacity = document.querySelector('#opacity').value

    const front = document.querySelector(".front");
    front.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Добавляем обработчики событий для всех инпутов
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    input.addEventListener("input", updateColor);
  });



// -------------------------------------------------------------------//

(function () {
  let rotateY = 0,
      rotateX = 0,
      velocityY = 0, // Скорость вращения по Y
      velocityX = 0, // Скорость вращения по X
      friction = .99, // Коэффициент трения (чем меньше, тем быстрее останавливается)
      keys = {}, 
      startX = 0,
      startY = 0,
      sensitivity = 0.1, // Чувствительность свайпа
      isSwiping = false; // Флаг, чтобы понимать, идет ли свайп

  document.onkeydown = function (e) {
    e.preventDefault();
    keys[e.keyCode] = true;
  };

  document.onkeyup = function (e) {
    keys[e.keyCode] = false;
  };

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      velocityX = 0;
      velocityY = 0;
      isSwiping = true;
    }
  });

  document.addEventListener("touchmove", function (e) {
    if (e.touches.length === 1) {
      let deltaX = e.touches[0].clientX - startX;
      let deltaY = e.touches[0].clientY - startY;

      velocityY = deltaX * sensitivity;
      velocityX = -deltaY * sensitivity;

      rotateY += velocityY;
      rotateX += velocityX;

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      updateCubeRotation();
    }
  });

  document.addEventListener("touchend", function () {
    isSwiping = false; // Останавливаем активное движение, запускаем инерцию
  });

  function updateCubeRotation() {
    let cube = document.querySelector('.cube');
    if (cube) {
      cube.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
  }

  function updateRotation() {
    if (keys[37]) velocityY = -2;
    if (keys[39]) velocityY = 2;
    if (keys[38]) velocityX = 2;
    if (keys[40]) velocityX = -2;

    if (!isSwiping) {
      velocityX *= friction; // Постепенное замедление по X
      velocityY *= friction; // Постепенное замедление по Y

      if (Math.abs(velocityX) < 0.01) velocityX = 0; // Останавливаем, если скорость очень маленькая
      if (Math.abs(velocityY) < 0.01) velocityY = 0; // Останавливаем, если скорость очень маленькая
    }

    rotateY += velocityY;
    rotateX += velocityX;

    updateCubeRotation();
    requestAnimationFrame(updateRotation);
  }

  updateRotation(); // Запуск анимации

  // Функция для изменения чувствительности свайпа
  window.setSwipeSensitivity = function (newSensitivity) {
    sensitivity = parseFloat(newSensitivity);
  };

  // Функция для изменения трения (инерции)
  window.setFriction = function (newFriction) {
    friction = parseFloat(newFriction);
  };
})();



// ----------------------------------------------------------- //