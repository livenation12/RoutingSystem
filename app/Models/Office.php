<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = [
        'officeName',
        'officeHeadId',
        'officialAlternateId'
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


}
