document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.js-filter');
  const radioBtns = document.querySelectorAll('.js-radio');
  const tableContainer = document.querySelector('.js-table-container');
  const submitBtn = document.querySelector('.js-submit-btn');

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Загрузка...';

  const errorBlock = document.createElement('div');
  errorBlock.classList.add('error');

  submitBtn.style.display = 'none';

  [...radioBtns][0].focus();
  [...radioBtns].map(btn => {
    btn.addEventListener('change', async () => {
      const setLoader = setTimeout(() => {
        tableContainer.append(loader);
      }, 100);
      try {
        const data = await getTable(form);

        tableContainer.innerHTML = '';
        tableContainer.innerHTML = data;

        clearTimeout(setLoader);
      } catch(error) {
        errorBlock.textContent = error.message;
        tableContainer.append(errorBlock);

        clearTimeout(setLoader);
      } finally {
        loader.remove();
      }
    })
  });

  async function getTable(form) {
    try {
      const response = await fetch('/templates/table.php', {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.status === 404) {
        throw new Error('Запрашиваемая страница не найдена');
      }
      const data = response.text();

      return data;
    } catch (error) {
      return `<div class="error">Ошибка: ${error.message}</div>`;
    }
  }
})
