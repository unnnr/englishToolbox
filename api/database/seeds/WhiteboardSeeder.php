<?php

use Illuminate\Database\Seeder;
use App\Models\Status;

class WhiteboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::create([
            'of' => 'whiteboard',
            'value' => 'locked'
        ]);
    }
}
