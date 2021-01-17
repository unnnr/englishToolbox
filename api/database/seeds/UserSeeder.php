<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Creating Super Admin
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@email.com',
            'password' => 'please_change_me'
        ]);

        $admin->roles()->create([
            'name' => 'admin'
        ]);

        $admin->markEmailAsVerified();
    }
}
