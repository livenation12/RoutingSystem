<?php

namespace App\Models;

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

    public static function generateDocTin()
    {
        // Get the current year and month
        $currentYear = date('y');
        $currentMonth = date('m');
        $currentMonthYear = $currentMonth . $currentYear; // MMYY format

        // Get the highest counter for the current month/year
        $highestCounter = self::where('docTin', 'LIKE', "DH - $currentMonthYear%")
            ->orderByDesc('docTin') // Make sure we sort the results to get the highest docTin
            ->pluck('docTin')
            ->first(); // Just get the first (max) entry, no need to map and get max manually

        // If we found a docTin, extract the counter, otherwise start at 1
        if ($highestCounter) {
            // Extract the counter part (3 digits) from the docTin, e.g., '001'
            list(,, $counter) = explode(' - ', $highestCounter);
            $counter = (int) $counter + 1; // Increment the counter
        } else {
            $counter = 1; // If no records found, start with 1
        }

        // Return the new docTin, padded to 3 digits
        return sprintf('DH - %s - %03d', $currentMonthYear, $counter);
    }

}
