<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/core.php';

$race = $_GET['race'] ?? '';

if (!$race || $race === 'all') {
  $choice = 'all';
  $data = totalResult($cars, $attempts);
  $totalAttemps = count($data['result'][0]['results']);
} else {
  $choice = $race;
  $data = roundResult($cars, $attempts, $race);
  $totalAttemps = count($data['result'][0]['results']);
}
