<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
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
        $permissions = [
            'Manage Content',
            'Delete Comments',
            'Ban Users'
        ];

        foreach ($permissions as $permission)
            Permission::create(['name' => $permission]);

        $adminRole = Role::create([
            'name' => 'Super Admin'
        ]);

        $admin = User::create([
            'name' => 'admin',
            'email' => 'dummy@dumb.dum',
            'password' => '123'
        ]);

        $adminRole->syncPermissions($permissions);
        $admin->assignRole($adminRole);
    }
}
