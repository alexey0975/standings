<?php
$attempts_json = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/data_attempts.json');
$attempts = json_decode($attempts_json, true);
