// Аккордеон

document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        content.classList.toggle("active");

        // Закрываем другие
        document.querySelectorAll(".accordion-content").forEach(item => {
            if (item !== content) {
                item.classList.remove("active");
            }
        });
    });
});

// Открытие сайдбара

const button = document.querySelector('.accordion-button')

button.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar')
    button.classList.toggle('accordion-button__active')
    sidebar.classList.toggle('sidebar__active')
})

