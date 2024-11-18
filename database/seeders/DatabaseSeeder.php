<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // $this->call(RoleSeeder::class);
        // $this->call(AdminSeeder::class);
        // $this->call(ReceiverSeeder::class);
        User::create([
            'firstName' => 'Mark',
            'lastName' => 'Yap',
            'email' => 'icthead.dasmo@gmail.com',
            'password' => bcrypt('password'),
        ])->assignRole('officeHead');
        // User::create([
        //     'firstName' => 'Alice',
        //     'lastName' => 'Smith',
        //     'email' => 'deptHead.dasmo@gmail.com',
        //     'password' => bcrypt('password'),
        // ])->assignRole('deptHead');
        // User::factory(10)->create();
        // $this->call(UserSeeder::class);
        // $this->call(OfficeSeeder::class);
    }
}
