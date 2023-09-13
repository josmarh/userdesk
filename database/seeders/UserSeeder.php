<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@userdesk.com',
            'email_verified_at' => now(),
            'password' => bcrypt('Admin@234'),
            'created_by' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ])->assignRole('admin');

        User::create([
            'name' => 'user',
            'email' => 'user@userdesk.com',
            'email_verified_at' => now(),
            'password' => bcrypt('User@234'),
            'created_by' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ])->assignRole('user');
    }
}
