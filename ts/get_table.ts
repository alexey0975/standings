document.addEventListener('DOMContentLoaded', () => {
  interface IData {
    choice: string | number,
    data: {
      result: IResult[],
      round: number,
      title: string,
    },
    total_attemps: number,
  }

  interface IResult {
    car: string,
    city: string,
    id: number,
    name: string,
    rating: number,
    results: [],
    total_score: number,
  }

  const radioBtns: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js-radio');
  const tableContainer = document.querySelector('.js-table-container');
  const submitBtn: HTMLButtonElement | null = document.querySelector('.js-submit-btn');

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Загрузка...';

  const errorBlock = document.createElement('div');
  errorBlock.classList.add('error');

  if (submitBtn) submitBtn.style.display = 'none';

  radioBtns[0].focus();
  Array.from(radioBtns).map((btn) => {
    btn.addEventListener('change', async () => {
      const setLoader = setTimeout(() => {
        tableContainer && tableContainer.append(loader);
      }, 100);
      try {
        const data = await getTable(btn.name, btn.value);
        if (tableContainer) {
          tableContainer.innerHTML = '';
          tableContainer.innerHTML = tablePattern(data);
        }

        clearTimeout(setLoader);
      } catch (error: any) {
        console.error(error);
        errorBlock.textContent = 'Ошибка: ' + error.message;
        tableContainer && tableContainer.append(errorBlock);

        clearTimeout(setLoader);
      } finally {
        loader.remove();
      }
    });
  });

  const tablePattern = (data: IData) => {
    return `
    <table class="table">
      <caption class="title title_table">${data.data.title}</caption>
      <thead class="table__header">
        <tr class="table__row">
          <th class="table__cell" colspan="3">Участник</th>

          ${(data.choice === 'all'
        ? `<th class="table__cell" colspan="4">Промежуточные результаты</th>
          <th class="table__cell" rowspan="2">Всего очков</th>`
        : `<th class="table__cell" rowspan="2">Результат</th>`)}

          <th class="table__cell" rowspan="2">Место</th>
        </tr>

        <tr class="table__row">
          <th class="table__cell">Фамилия И.О.</th>
          <th class="table__cell">Город</th>
          <th class="table__cell">Автомобиль</th>

          ${data.choice === 'all'
        ? (() => {
          let cells = '';
          for (let i = 1; i <= data.total_attemps; i++) {
            cells += `<th class="table__cell">${i}</th> \n`;
          }
          return cells;
        })()
        : ''}
        </tr>
      </thead>

      <tbody class="table__body">

      ${data.data.result.map((car) => {
          const rating = car.rating;
          let winClass = '';
          switch (rating) {
            case 1:
              winClass = 'winner winner_first';
              break;
            case 2:
              winClass = 'winner winner_second';
              break;
            case 3:
              winClass = 'winner winner_thrid';
              break;
            default:
              winClass = '';
              break;
          }

          return `
          <tr class="table__row table__row_data">
            <td class="table__cell" data-heading="Фамилия И.О.">${car.name}</td>
            <td class="table__cell" data-heading="Город">${car.city}</td>
            <td class="table__cell" data-heading="Автомобиль">${car.car}</td>
            ${data.choice === 'all'
              ? car.results.map((value: number | string, index: number) => (
                `<td class="table__cell" data-heading="${index + 1}-й заезд">${value}</td>`)).join('\n') +
              `<td class="table__cell" data-heading="Всего очков">${car.total_score}</td>`
              : `<td class="table__cell" data-heading="Результат">${car.results[Number(data.choice) - 1]}</td>`}
            <td class="table__cell ${winClass || null}" data-heading="Место">${rating}</td>
          </tr>`
        }).join('\n')}
      </tbody>
    </table>
    `;
  };

  async function getTable(name: string, value: number | string): Promise<IData> {
    try {
      const response = await fetch(`/src/api.php?${name}=${value}`, {
        method: "GET",
      });

      if (response.status === 404) {
        throw new Error("Запрашиваемая страница не найдена");
      }

      const data = response.json();
      return data;
    } catch (error: any) {
      return error;
    }
  }
});
