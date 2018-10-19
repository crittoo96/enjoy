<?php
require 'TwistOAuth.phar';
$CONSUMER_KEY = "e7Hl6zNVk2C45QykHjVXSBYoO";
$CONSUMER_SECRET = "f7Ts6Hb1BtcQX7RrA3jRhoFrYGCRJV9sydWiOQUIKCh2rWGjXW";
$ACCESS_TOKEN = "1406842160-0f5AL1LrkEiQmZOvFg7YsnrU4Oubf6zRoQqNYYd";
$ACCESS_TOKEN_SECRET = "vUOcQkLpCpnvUhte18tyGImvZvJ5pgHye3sLeUTlDSRXs";

$connection = new TwistOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);
$user_params = ['screen_name' => 'crittoo96'];
$friend_users = $connection->get('friends/ids', $user_params);

// 友人からランダムにidを取得
$friend_user_ids_str = "";
$hash = $friend_users->ids;
$cnt = 25;// 取得数
$keys = array_keys($hash);
shuffle($keys);
for ($i = 0; $i < $cnt; $i++) {
    $friend_user_ids_str .= $hash[$keys[$i]] . ",";
}
print($friend_user_ids_str);

$users_lookup = $connection->get('users/lookup', ['user_id' => $friend_user_ids_str]);
print_r($users_lookup);