<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    public function index()
    {
        $query = Transaction::query();
        $transactions = $query->orderBy('id', 'desc')->paginate(10);
        return inertia("Transaction/Index", [
            "transactions" => TransactionResource::collection($transactions)
        ]);
    }

    public function edit(Transaction $transaction)
    {
        TransactionResource::withoutWrapping();
        return inertia("Transaction/ProposalEdit", [
            'transaction' => new TransactionResource($transaction),
        ]);
    }

    public function show(Transaction $transaction)
    {
        TransactionResource::withoutWrapping();
        return inertia("Transaction/TransactionShow", [
            'transaction' => new TransactionResource($transaction),
        ]);
    }
    public function destroy(Transaction $transaction)
    {
        Storage::delete($transaction->proposal->attachment);
        $transaction->delete();
        return redirect()->route('transaction.index');
    }
}
