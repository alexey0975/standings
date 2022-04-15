<?php
function addRating(array $arr, array | int | string $round) : array
{
  $count = 0;
  $prewValue = INF;
  $roundType = gettype($round);

  foreach ($arr as $key => $item) {
    if ($roundType === 'string' || $roundType === 'int') {
      $thisValue = $item[$round];
    }

    if (gettype($round) === 'array') {
      $thisValue = $item;
      foreach ($round as $value) {
        $thisValue = $thisValue[$value];
      }
    }

    if ($thisValue < $prewValue) {
      $prewValue = $thisValue;
      $count++;
    }
    $arr[$key]['rating'] = $count;
  }

  return $arr;
}
