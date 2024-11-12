<?php

namespace Database\Seeders;

use App\Models\AccessLevel;
use Illuminate\Database\Seeder;
use App\Models\User; // Make sure to import the User model

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create the access level first
        $accessLevel = AccessLevel::create([
            'level' => 1,
            'description' => 'Administrator',
        ]);

        // Now create a user with the accessLevelId referencing the newly created access level
        User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'joshua.dasmo@gmail.com',
            'password' => bcrypt('password'), // Ensure to hash the password
        ]);

        // Optionally, create multiple users
        // User::factory()->count(10)->create(); // If using factories
    }
}
