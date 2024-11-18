<?php

namespace App\Models;


// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasRoles, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'officeId',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'receiverId');
    }

    public function deptHead()
    {
        return $this->hasOne(Office::class, 'deptHeadId');
    }

    public function office()
    {
        return $this->belongsTo(Office::class, 'officeId');
    }

    public function officialAlternate()
    {
        return $this->hasMany(Office::class, 'officialAlternateId');
    }

    public static function getNoOfficeUsers()
    {
        return self::whereDoesntHave('office') //get all users who doesnt have a office
            ->whereDoesntHave('roles', function ($query) { //exclude the user with role of admin
                $query->where('name', 'admin');
            })
            ->get(['id', 'firstName', 'lastName'])
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'fullName' => $user->firstName . ' ' . $user->lastName
                ];
            });
    }
}
