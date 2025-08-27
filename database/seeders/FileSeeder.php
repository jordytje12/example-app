<?php

namespace Database\Seeders;

use App\Models\File;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //File::factory()->count(10)->create();
        File::factory()->create([
            'file_name' => 'Seed test',
            'file_path' => '/files/test.csv',
        ]);
    }
}
