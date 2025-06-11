<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class UserActionController extends Controller
{
    public function read(){
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();
        return redirect()->back()->with('success', 'Notifications marked as read successfully.');
    }
}
