<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'fileName',
        'filePath',
        'proposalId',
    ];
    public $timestamps = false;

    public function proposal()
    {
        return $this->belongsTo(Proposal::class, 'proposalId');
    }
}
