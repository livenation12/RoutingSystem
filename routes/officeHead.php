<?php

use App\Http\Controllers\OfficeHead\DashboardController;
use App\Http\Controllers\OfficeHead\ProcessRoutingSlip;

Route::middleware(['auth', 'role:officeHead'])
          ->prefix('office-head')
          ->name('office-head.')
          ->group(function () {

                    //dedicated pages
                    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
                    Route::get('/routing-slip/{routingSlip}/process', [ProcessRoutingSlip::class, 'form'])->name('routing-slip.form');
                    Route::patch('/routing-slip/{routingSlip}/process', [ProcessRoutingSlip::class, 'process'])->name('routing-slip.process');
          });
