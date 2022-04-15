<?php

function arraySort(array $array, string | int | array $key = 'sort', $sort = SORT_ASC): array
{
  $sorter = function ($a, $b) use ($key) {
    $keyType = gettype($key);
    if ($keyType === 'string' || $keyType === 'int') {
      return ($a[$key] - $b[$key]);
    }

    if ($keyType === 'array') {
      foreach ($key as $value) {
        $a = $a[$value];
        $b = $b[$value];
      }
      return $a - $b;
    }
  };
  usort($array, $sorter);
  if ($sort === SORT_DESC) {
    return array_reverse($array);
  }
  return $array;
}
