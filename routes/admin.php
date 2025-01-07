<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ManageController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\OfficeController;
use App\Http\Controllers\Admin\UserController;

// Admin-only routes
Route::middleware(['auth', 'role:admin'])
          ->prefix('admin')
          ->name('admin.')
          ->group(function () {
                    //dedicated pages
                    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
                    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
                    Route::resource('/office', OfficeController::class);
                    Route::get('/manage', ManageController::class)->name('manage');
                    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
                    Route::post('/user', [UserController::class, 'store'])->name('user.store');
                    Route::post('/user/{user}/assign', [UserController::class, 'assignRole'])->name('user.assign');
          });
