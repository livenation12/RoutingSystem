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
        Schema::create('counter_tracker', function (Blueprint $table) {
            $table->id();
            $table->string('officeAbbr')->unique();
            $table->string('monthYear');
            $table->integer('counter');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counter_tracker');
    }
};
