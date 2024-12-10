<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class RoutingSlip extends Model
{
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
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'fromUserId');
    }
    public function remarks()
    {
        return $this->hasMany(Remarks::class, 'routingSlipId');
    }

    public function endorsedTo()
    {
        return $this->belongsTo(Office::class, 'endorsedToOfficeId');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transactionId');
    }


    /**
     * Generate a new docTin identifier.
     *
     * This method generates a unique document identifier (docTin) for the current
     * month and year in the format "DH - MMYY - XXX". It retrieves the highest
     * existing counter for the current month and year, increments it, and returns
     * the new identifier. If no existing docTin is found, it initializes the counter
     * to 1.
     *
     * @return string The newly generated docTin identifier.
     */

    // private static function generateDocTin()
    // {
    //     // Get the current year and month
    //     $currentYear = date('y');
    //     $currentMonth = date('m');
    //     $currentMonthYear = $currentMonth . $currentYear; // MMYY format

    //     // Get the highest counter for the current month/year
    //     $highestCounter = self::where('docTin', 'LIKE', "DH - $currentMonthYear%")
    //         ->orderByDesc('docTin') // Make sure we sort the results to get the highest docTin
    //         ->pluck('docTin')
    //         ->first(); // Just get the first (max) entry, no need to map and get max manually

    //     // If we found a docTin, extract the counter, otherwise start at 1
    //     if ($highestCounter) {
    //         // Extract the counter part (3 digits) from the docTin, e.g., '001'
    //         list(, , $counter) = explode(' - ', $highestCounter);
    //         $counter = (int) $counter + 1; // Increment the counter
    //     } else {
    //         $counter = 1; // If no records found, start with 1
    //     }

    //     // Return the new docTin, padded to 3 digits
    //     return sprintf('DH - %s - %03d', $currentMonthYear, $counter);
    // }

    /**
     * Bootstrap the model and its traits.
     *
     * Automatically generates a 'docTin' for the RoutingSlip model
     * before creating a new instance, if not already set.
     */
    public static function generateDocTin($officeAbbr)
    {
        $monthYear = now()->format;
        $counter = 1;
        DB::beginTransaction();
        try {
            $record = CounterTracker::lockForUpdate()
                ->where('officeAbbr', $officeAbbr)
                ->where('monthYear', $monthYear)
                ->first();
            if ($record) {
                $counter += 1;
                $record->counter = $counter;
                $record->save();
            } else {
                CounterTracker::create([
                    'monthYear' => $monthYear,
                    'counter' => $counter,
                    'officeAbbr' => $officeAbbr
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error("Unable to update or add counter tracker: " . $e->getMessage());

        }
        return sprintf('$s-%s-%03d', $officeAbbr, $monthYear, $counter);
    }

    protected static function booted()
    {
        static::creating(function ($routingSlip) {
            if (empty($routingSlip->docTin)) {
                if(!$routingSlip->fromUser){
                    return false;
                }
                $routingSlip->docTin = self::generateDocTin($routingSlip->fromUser->office->abbr);
            }
        });
    }
}
