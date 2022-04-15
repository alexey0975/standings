<?php
$cars_json = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/data_cars.json');
$cars = json_decode($cars_json, true);
