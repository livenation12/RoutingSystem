<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{

    protected $table = 'offices';
    protected $fillable = [
        'officeName',
        'officeHeadId',
        'officialAlternateId',
        'abbr'
    ];

    public function officeHead()
    {
        return $this->belongsTo(User::class, 'officeHeadId');
    }

    public function officialAlternate()
    {
        return $this->belongsTo(User::class, 'officialAlternateId');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Returns all offices excluding the one the current user is in
     * 
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function endorsedToOptions()
    {
        return self::where('id', '!=', Auth::user()->officeId)->get();
    }
}
