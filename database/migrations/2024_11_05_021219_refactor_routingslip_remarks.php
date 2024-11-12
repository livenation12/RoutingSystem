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

        // Rename 'officeId' to 'routingSlipId' in the 'remarks' table
        Schema::table('remarks', function (Blueprint $table) {
            $table->string('office');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        // Rename 'routingSlipId' back to 'officeId' in the 'remarks' table
        Schema::table('remarks', function (Blueprint $table) {
            $table->dropColumn('office');
        });
    }
};
