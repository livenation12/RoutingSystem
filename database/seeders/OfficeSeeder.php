<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Office::create([
            'officeName' => 'ICT Division',
            'deptHeadId' => 1,
        ]);

        Office::create([
            'officeName' => 'Data Management & Compliance Section',
            'deptHeadId' => 1,
        ]);
        
    }
}
