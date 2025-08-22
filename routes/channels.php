<?php

use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('file-uploaded.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
