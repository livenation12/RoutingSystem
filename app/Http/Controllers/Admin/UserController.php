<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store() {}

    public function create()
    {
        return inertia("Admin/Manage/User/UserCreate");
    }
}
