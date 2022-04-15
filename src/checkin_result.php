<?php
require_once __DIR__ . '/array_sort.php';
require_once __DIR__ . '/add_rating.php';

function concatResult(array $cars, array $attempts): array
{
  foreach ($cars as $key => $car) {
    $cars[$key]['total_score'] = 0;

    foreach ($attempts as $attempt) {
      if ($car['id'] === $attempt['id']) {
        $cars[$key]['total_score'] += $attempt['result'];
        $cars[$key]['results'][] = $attempt['result'];
      }
    }
  }

  return $cars;
}

function totalResult(array $cars, array $attempts): array
{
  $data = concatResult($cars, $attempts);
  $sortData = arraySort($data, 'total_score', SORT_DESC);

  return [
    'title' => 'Общий зачет',
    'result' => addRating($sortData, 'total_score'),
    'round' => 'all',
  ];
}

function roundResult(array $cars, array $attempts, int $round): array
{
  $data = concatResult($cars, $attempts);
  $sortData = arraySort($data, ['results', $round - 1], SORT_DESC);

  return [
    'title' => $round . '-й заезд',
    'result' => addRating($sortData, ['results', $round - 1]),
    'round' => $round,
  ];
}
