<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('attachments', function (Blueprint $table) {
            $table->foreignId('routingId')->constrained('routing_slips')->cascadeOnDelete();
            $table->unsignedBigInteger('proposalId')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attachments', function (Blueprint $table) {
            $table->dropColumn('routingId');
            $table->unsignedBigInteger('proposalId')->nullable(false)->change();

        });
    }
};
