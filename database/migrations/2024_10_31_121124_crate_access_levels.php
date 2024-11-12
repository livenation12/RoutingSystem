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
        Schema::create('access_levels', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->string('description');
        });

        Schema::table('users', function (Blueprint $table) {
            // Change the access_level_id to nullable initially
            $table->foreignId('access_level_id')->nullable()->constrained('access_levels');
            $table->renameColumn('name', 'first_name');
            $table->string('last_name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the foreign key and column when rolling back
            $table->dropForeign(['access_level_id']);
            $table->dropColumn('access_level_id');
        });

        Schema::dropIfExists('access_levels');
    }
};
