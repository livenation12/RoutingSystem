<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class   RoutingSlip extends Model
{
    private static $fileDirectory = 'uploads/routings';
    protected $table = 'routing_slips';
    protected $fillable = [
        'docTin',
        'transactionId',
        'fromUserId',
        'urgency',
        'subject',
        'action',
        'endorsedToOfficeId',
        'status',
        'additionalRemarks',
        'actionRequested',
        'endorsedByOfficeId'
    ];

    //<-- relationships
    public function fromUser()
    {
        return $this->belongsTo(User::class, 'fromUserId');
    }
    public function remarks()
    {
        return $this->hasMany(Remarks::class, 'routingSlipId');
    }

    public static function getFileDirectory()
    {
        return self::$fileDirectory;
    }

    public function endorsedTo()
    {
        return $this->belongsTo(Office::class, 'endorsedToOfficeId');
    }

    public function endorsedBy()
    {
        return $this->belongsTo(Office::class, 'endorsedByOfficeId');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transactionId');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'routingId');
    }

    public function routingLogs()
    {
        return $this->hasMany(RoutingLog::class, 'routingSlipId');
    }


    //end of relationship -->

    public static function generateDocTin($officeAbbr)
    {
        $monthYear = now()->format('my'); // Get the current month-year format (e.g., 1224 for December 2024)
        $counter = 1; // Default starting value for the counter

        DB::beginTransaction();
        try {
            // Try to find the record in the CounterTracker table, and lock it for update
            $record = CounterTracker::lockForUpdate()
                ->where('officeAbbr', $officeAbbr)
                ->where('monthYear', $monthYear)
                ->first();

            if ($record) {
                // If the record exists, increment the counter
                $counter = $record->counter + 1;
                $record->counter = $counter; // Update the counter in the record
                $record->save(); // Save the updated record
            } else {
                // If no record exists, create a new one with the initial counter value
                $counter = 1;
                CounterTracker::create([
                    'monthYear' => $monthYear,
                    'counter' => $counter,
                    'officeAbbr' => $officeAbbr
                ]);
            }
            DB::commit(); // Commit the transaction if everything goes well
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction if an error occurs
            \Log::error("Unable to update or add counter tracker: " . $e->getMessage());
        }

        // Generate the docTin based on officeAbbr, monthYear, and counter
        return sprintf('%s-%s-%03d', $officeAbbr, $monthYear, $counter);
    }

    protected static function booted()
    {
        static::creating(function ($routingSlip) {
            if (empty($routingSlip->docTin)) {
                if (!$routingSlip->fromUserId) {
                    return false;
                }
                $routingSlip->docTin = self::generateDocTin($routingSlip->fromUser->office->abbr);
            }
        });
    }
}
