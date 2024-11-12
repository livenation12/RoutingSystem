<?php

use App\Http\Controllers\DepartmentHead\DashboardController;

Route::middleware(['auth', 'role:deptHead'])->prefix('receiver')->group(function () {

          //dedicated pages
          Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});
