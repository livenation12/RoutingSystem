<?php

namespace App\Providers;

use Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'unreadNotifs' => function () {
                if($user = Auth::user()){
                    return $user->unreadNotifications->map(function ($notification) {
                        return [
                            'id' => $notification->id,
                            'type' => $notification->type,
                            'data' => $notification->data,
                            'read_at' => $notification->read_at,
                            'created_at' => $notification->created_at->diffForHumans(),
                        ];
                    });
                }
                return [];
            },
        ]);
    }
}
