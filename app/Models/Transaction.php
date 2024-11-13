<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
          protected $fillable = [
                    'receiverId',
                    'accomplishmentDate',
          ];
          public function proposal()
          {
                    return $this->hasOne(Proposal::class, 'transactionId');
          }
          public function receiver()
          {
                    return $this->belongsTo(User::class, 'receiverId');
          }

          public function routingSlips()
          {
                    return $this->hasMany(RoutingSlip::class, 'transactionId');
          }
}
