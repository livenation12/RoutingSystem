<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManageController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\Receiver\DashboardController;
use App\Http\Controllers\Receiver\IncomingController;
use App\Http\Controllers\Receiver\InitialRoutingController;
use App\Http\Controllers\ReceiverController;
use App\Http\Controllers\RoutingController;
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
    Route::get('/routing', [RoutingController::class, 'index'])->name('routing.index');
    Route::get('/routing/{routingSlip}/show', [RoutingController::class, 'show'])->name('routing.show');
    Route::post('/routing', [RoutingController::class, 'store'])->name('routing.store');
    Route::get('/routing/{transaction}/create', [RoutingController::class, 'create'])->name('routing.create');
});

require __DIR__ . '/receiver.php';

require __DIR__ . '/officeHead.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/departmentHead.php';

require __DIR__ . '/auth.php';
