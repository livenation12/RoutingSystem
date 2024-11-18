<?php

use App\Http\Controllers\DepartmentHead\DashboardController;
use App\Http\Controllers\DepartmentHead\ProcessRoutingSlip;

Route::middleware(['auth', 'role:deptHead'])
    ->prefix('department-head')
    ->name('department-head.')
    ->group(function () {

        //dedicated pages
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/routing-slip/{routingSlip}/process', [ProcessRoutingSlip::class, 'form'])->name('routing-slip.form');
        Route::patch('/routing-slip/{routingSlip}/process', [ProcessRoutingSlip::class, 'process'])->name('routing-slip.process');
    });
