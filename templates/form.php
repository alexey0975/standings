<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/post_processing.php';
?>

<form class="js-filter form" action="/" method="GET">
  <h2 class="form__title">Результаты: </h2>
  <div class="form__inner">
    <label class="radio form__field">
      <input type="radio" class="radio__btn visually-hidden js-radio" name="race" value="all" <?= $choice === 'all' || !$choice ? 'checked' : '' ?>>
      <span class="radio__descr">Общий зачет</span>
    </label>

    <?php for ($i = 1; $i <= $totalAttemps; $i++) { ?>
      <label class="radio form__field">
        <input type="radio" class="radio__btn visually-hidden js-radio" name="race" value="<?= $i ?>" <?= $choice == $i ? 'checked' : '' ?>>
        <span class="radio__descr"><?= $i ?>-й заезд</span>
      </label>
    <?php } ?>
  </div>

  <button type="submit" class="form__submit js-submit-btn">Получить</button>
</form>
