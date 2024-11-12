<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\ManageController;
use App\Http\Controllers\OfficeController;

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
          });
