<?php

namespace App\Http\Controllers;

use App\Http\Requests\Office\StoreOfficeRequest;
use App\Models\Office;
use App\Models\User;

class OfficeController extends Controller
{
    public function store(StoreOfficeRequest $request)
    {
        $office = $request->validated();
        Office::create($office);
        return redirect()->route('manage');
    }
    public function create()
    {
        $noOfficeUsers = User::getNoOfficeUsers();
        return inertia("Manage/Office/OfficeCreate", [
            'noOfficeUsers' => $noOfficeUsers
        ]);
    }

    public function edit(Office $office)
    {
        $noOfficeUsers = User::getNoOfficeUsers();
        return inertia("Manage/Office/OfficeEdit", [
            'office' => $office,
            'noOfficeUsers' => $noOfficeUsers
        ]);
    }
}
