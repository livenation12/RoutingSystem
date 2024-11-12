<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    private static $fileDirectory = 'uploads/proposals';

    protected $fillable = [
        'trackingId',
        'title',
        'description',
        'source',
        'sourceType',
        'attachment',
        'transactionId',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transactionId');
    }

    // Static method to get the file directory
    public static function getFileDirectory()
    {
        return self::$fileDirectory;
    }


    /**
     * Generate a new tracking ID for a proposal.
     *
     * Format is MMYY - 001 (incrementing counter)
     *
     * @return string
     */
    public static function generateTrackingId()
    {
        $currentYear = date('y'); // Current year (last two digits)
        $currentMonth = date('m'); // Current month (01 to 12)
        $currentMonthYear = $currentMonth . $currentYear; // Format as MMYY

        // Get the highest counter for the current month/year
        $highestCounter = Proposal::where('trackingId', 'LIKE', "$currentMonthYear%")
            ->pluck('trackingId') // Get all matching tracking IDs
            ->map(function ($trackingId) {
                list(, $counter) = explode(' - ', $trackingId);
                return (int) $counter; // Convert to integer
            })
            ->max(); // Find the maximum counter
        // Initialize the counter
        $counter = $highestCounter ? $highestCounter + 1 : 1; // Increment or start at 1

        // Return the new tracking ID, padded to 3 digits
        return sprintf('%s - %03d', $currentMonthYear, $counter);
    }
}
