<?php
$raw_passwd = '3kanmarusan_Passw0rd';

echo 'PASSWORD_DEFAULT' . PHP_EOL;
$hashed_passwd = password_hash($raw_passwd,
                               PASSWORD_DEFAULT);
echo ' hash:' . $hashed_passwd . PHP_EOL;

echo 'PASSWORD_BCRYPT(cost12)' . PHP_EOL;
$hashed_passwd = password_hash($raw_passwd,
                               PASSWORD_BCRYPT,
                               ['cost' => 12]); // コストも変えてみる
echo ' hash:' . $hashed_passwd . PHP_EOL;

// $info = password_get_info($raw_passwd);
    print_r(password_verify($raw_passwd, $hashed_passwd));