<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\Office;
use App\Models\User;

class ManageController extends Controller
{
    public function __invoke()
    {
        return inertia('Admin/Manage/Index', [
            'offices' =>  OfficeResource::collection(Office::all()),
            'users' =>  UserResource::collection(User::with('office')->get())
        ]);
    }
}
