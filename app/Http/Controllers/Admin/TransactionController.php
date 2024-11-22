<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $query = Transaction::query();
        $transactions = $query->with(['proposal', 'receiver', 'routingSlips', 'routingSlips.fromUser'])
            ->orderBy('id', 'desc')
            ->paginate($this->pageCount);

        return inertia('Admin/Transaction/Index', [
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }
}
