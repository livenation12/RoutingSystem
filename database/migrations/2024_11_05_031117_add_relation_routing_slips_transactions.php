<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('routing_slips', function (Blueprint $table) {
            $table->foreignId('transactionId')->constrained('transactions')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('routing_slips', function (Blueprint $table) {
            $table->dropForeign(['transactionId']);
            $table->dropColumn('transactionId');
        });
    }
};
