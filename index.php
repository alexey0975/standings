<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/header.php';
?>

<main>
  <div class="container">
    <section class="section section_form">
      <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/form.php'; ?>
    </section>

    <section class="section section_table js-table-container">
      <h2 class="visually-hidden">Результаты заезда</h2>
      <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/table.php'; ?>
    </section>
  </div>
</main>
<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php';
