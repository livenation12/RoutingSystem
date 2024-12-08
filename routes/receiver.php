<?php

use App\Http\Controllers\Receiver\DashboardController;
use App\Http\Controllers\Receiver\IncomingController;
use App\Http\Controllers\Receiver\InitialRoutingSlipController;
use App\Http\Controllers\Receiver\TransactionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:receiver'])
          ->prefix('receiver')
          ->name('receiver.')
          ->group(function () {

                    // Dedicated pages for the receiver role
                    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
                    //incoming
                    Route::post('/incoming', [IncomingController::class, 'store'])->name('incoming.store');
                    Route::get('/incoming/create', [IncomingController::class, 'create'])->name('incoming.create');

                    //transaction
                    Route::get('/transaction/{transaction}/edit', [TransactionController::class, 'edit'])->name('transaction.edit');
                    Route::patch('/transaction/{transaction}', [TransactionController::class, 'update'])->name('transaction.update');

                    //routing-slip
                    Route::get('/routing-slip/{transaction}/create', [InitialRoutingSlipController::class, 'create'])->name('initial-routing.create');
                    Route::post('/routing-slip/{transaction}/initialize', [InitialRoutingSlipController::class, 'initialize'])->name('initial-routing.initialize');

                    //attachments
                    Route::delete('/attachment/{transaction}', [TransactionController::class, 'removeAttachments'])->name('attachment.remove');
                    Route::post('/attachment/{transaction}', [TransactionController::class, 'storeAttachments'])->name('attachment.store');
          });
