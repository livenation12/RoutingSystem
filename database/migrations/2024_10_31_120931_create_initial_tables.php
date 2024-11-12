<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('officeName');
            $table->foreignId('deptHeadId')->constrained('users');
            $table->foreignId('officialAlternate')->constrained('users')->nullable();
            $table->timestamps();
        });

        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('trackingId');
            $table->string('source');
            $table->string('sourceType');
            $table->string('title');
            $table->text('description');
            $table->string('attachment');
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) { // Move this up
            $table->id();
            $table->foreignId('receiverId')->constrained('users');
            $table->string('accomplishmentDate')->nullable();
            $table->timestamps();
        });

        Schema::create('remarks', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->foreignId('officeId')->constrained('offices');
            $table->timestamps();
        });

        Schema::create('routing_slips', function (Blueprint $table) {
            $table->id();
            $table->string('drsNo')->unique();
            $table->foreignId('fromUserId')->constrained('users');
            $table->string('urgency');
            $table->text('subject');
            $table->text('action')->nullable();
            $table->foreignId('endorsedToOfficeId')->constrained('offices')->nullable();
            $table->string('status');
            $table->foreignId('remarksId')->constrained('remarks');
            $table->text('additionalRemarks')->nullable();
            $table->string('actionRequested');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routing_slips');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('remarks');
        Schema::dropIfExists('proposals');
        Schema::dropIfExists('offices');
    }
};
