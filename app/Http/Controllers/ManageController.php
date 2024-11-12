<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfficeResource;
use App\Models\Office;

class ManageController extends Controller
{
    public function __invoke()
    {
        OfficeResource::withoutWrapping();
        return inertia('Manage/Index', [
            'offices' =>  OfficeResource::collection(Office::all())
        ]);
    }
}
