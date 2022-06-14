<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/post_processing.php';
?>

<table class="table">
  <caption class="title title_table"><?= $data['title'] ?></caption>
  <thead class="table__header">
    <tr class="table__row">
      <th class="table__cell" colspan="3">
        Участник
      </th>

      <?php if ($choice === 'all') { ?>
        <th class="table__cell" colspan="<?= $totalAttemps ?>">
          Промежуточные результаты
        </th>

        <th class="table__cell" rowspan="2">
          Всего очков
        </th>
      <?php } else { ?>
        <th class="table__cell" rowspan="2">
          Результат
        </th>
      <?php } ?>

      <th class="table__cell" rowspan="2">
        Место
      </th>
    </tr>

    <tr class="table__row">
      <th class="table__cell">Фамилия И.О.</th>
      <th class="table__cell">Город</th>
      <th class="table__cell">Автомобиль</th>

      <?php if ($choice === 'all') {
        for ($i = 1; $i <= $totalAttemps; $i++) { ?>
          <th class="table__cell"><?= $i ?></th>
      <?php }
      } ?>

    </tr>
  </thead>
  <tbody class="table__body">
    <?php foreach ($data['result'] as $key => $car) {
      $rating =  $car['rating'];
      switch ($rating) {
        case '1':
          $winClass = 'winner winner_first';
          break;
        case '2':
          $winClass = 'winner winner_second';
          break;
        case '3':
          $winClass = 'winner winner_thrid';
          break;
        default:
          $winClass = '';
      } ?>
      <tr class="table__row table__row_data">
        <td class="table__cell" data-heading="Фамилия И.О.">
          <?= $car['name'] ?>
        </td>
        <td class="table__cell" data-heading="Город">
          <?= $car['city'] ?>
        </td>
        <td class="table__cell" data-heading="Автомобиль">
          <?= $car['car'] ?>
        </td>

        <?php if ($choice === 'all') {
          foreach ($car['results'] as $key => $result) { ?>
            <td class="table__cell" data-heading="<?= $key + 1 ?>-заезд">
              <?= $result ?>
            </td>
          <?php } ?>

          <td class="table__cell" data-heading="Всего очков">
            <?= $car['total_score'] ?>
          </td>

        <?php } else { ?>
          <td class="table__cell" data-heading="Результат">
            <?= $car['results'][(int)$choice - 1] ?>
          </td>
        <?php } ?>

        <td class="table__cell <?= $winClass ?>" data-heading="Место">
          <?= $rating ?>
        </td>
      </tr>
    <?php } ?>
  </tbody>
</table>
