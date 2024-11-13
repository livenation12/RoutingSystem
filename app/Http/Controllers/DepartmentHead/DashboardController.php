<?php

namespace App\Http\Controllers\DepartmentHead;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('DepartmentHead/Dashboard');
    }

    private function getDepartmentHeadRoutings()
    {
        
    }
}
