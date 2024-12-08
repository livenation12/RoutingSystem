<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller; // This is the base controller
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $query = Transaction::query();
        $query = $this->applySearchFilter($query, $search);

        // Paginate the results with the shared pageCount property
        $transactions = $query->with([
            'proposal',
            'receiver',
            'routingSlips',
            'routingSlips.fromUser'
        ])
            ->orderBy('id', 'desc')
            ->paginate($this->pageCount); // Use $this->pageCount from the base controller

        return inertia('Admin/Transaction/Index', [
            'transactions' => TransactionResource::collection($transactions),
            'search' => $search, // Pass the search query back to the view
        ]);
    }
}
