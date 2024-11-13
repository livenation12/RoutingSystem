<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManageController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\Receiver\DashboardController;
use App\Http\Controllers\Receiver\IncomingController;
use App\Http\Controllers\Receiver\InitialRoutingSlipController;
use App\Http\Controllers\ReceiverController;
use App\Http\Controllers\RoutingSlipController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

// Protect all routes with 'auth' middleware for authentication
Route::middleware(['auth'])->group(function () {

    // Profile routes for authenticated users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Transaction routes
    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::get('/transaction/{transaction}/show', [TransactionController::class, 'show'])->name('transaction.show');
    Route::get('/transaction/{transaction}/edit', [TransactionController::class, 'edit'])->name('transaction.edit');
    Route::delete('/transaction/{transaction}/destroy', [TransactionController::class, 'destroy'])->name('transaction.destroy');

    // Routing slip routes
    Route::get('/routing-slip', [RoutingSlipController::class, 'index'])->name('routing-slip.index');
    Route::post('/routing-slip', [RoutingSlipController::class, 'store'])->name('routing-slip.store');
    Route::get('/routing-slip/{transaction}/create', [RoutingSlipController::class, 'create'])->name('routing-slip.create');
});






// Office Head-only routes
// Route::middleware(['auth', 'role:officeHead'])->prefix('receiver')->group(function () {

//     //dedicated pages
//     Route::get('/', [ReceiverController::class, 'index'])->name('receiver.dashboard');
// });


// Department Head-only routes



// Receiver-only routes
Route::middleware(['auth', 'role:receiver'])
    ->prefix('receiver')
    ->name('receiver.')
    ->group(function () {

        // Dedicated pages for the receiver role
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        //incoming
        Route::post('/incoming', [IncomingController::class, 'store'])->name('incoming.store');
        Route::get('/incoming/create', [IncomingController::class, 'create'])->name('incoming.create');
        //routing-slip
        Route::get('/routing-slip/{transaction}/create', [InitialRoutingSlipController::class, 'create'])->name('initial-routing.create');
        Route::post('/routing-slip/{transaction}/initialize', [InitialRoutingSlipController::class, 'initialize'])->name('initial-routing.initialize');
    });


require __DIR__ . '/admin.php';

require __DIR__ . '/departmentHead.php';

require __DIR__ . '/auth.php';
