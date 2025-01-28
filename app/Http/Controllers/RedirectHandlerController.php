<?php

namespace App\Http\Controllers;

use Auth;

class RedirectHandlerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->hasRole('admin')) {
                return redirect()->route('admin.dashboard');
            } elseif ($user->hasRole('receiver')) {
                return redirect()->route('receiver.dashboard');
            } elseif ($user->hasRole('deptHead')) {
                return redirect()->route('department-head.dashboard');
            } elseif ($user->hasRole('officeHead')) {
                return redirect()->route('office-head.dashboard');
            }
        } else {
            return redirect()->route('login');
        }
    }
}
