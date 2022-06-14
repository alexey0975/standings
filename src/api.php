<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/post_processing.php';

echo json_encode([
  'choice' => $choice,
  'data' => $data,
  'total_attemps' => $totalAttemps,
]);
