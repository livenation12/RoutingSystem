<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceiverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstName' => 'Juan',
            'lastName' => 'Cruz',
            'email' => 'receiver.dasmo@gmail.com',
            'password' => bcrypt('password'),
        ])->assignRole('receiver');
    }
}
