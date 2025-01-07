<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => [
                'required',
                'confirmed',
                Password::defaults(),
                'role' => ['required', 'exists:roles,name']
            ],
        ]);

        User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->assignRole($request->role);

        return redirect(route('admin.manage'));
    }

    public function create()
    {
        $roles = Role::all();
        return inertia("Admin/Manage/User/UserCreate", [
            'roles' => $roles
        ]);
    }

    public function assignRole(Request $request, User $user) {
        $user->assignRole($request->role);
    }
}
