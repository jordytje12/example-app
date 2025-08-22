<?php

namespace App\Listeners;

use App\Events\FileUploaded;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\FileUploadedNotification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ShowUploadNotification
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FileUploaded $event): void
    {
        Log::info('File uploaded notification', [
            'file' => $event->file->file_name,
            'user' => $event->user->name,
        ]);
        Mail::to($event->user->email)->send(new FileUploadedNotification($event->file));
    }
}
