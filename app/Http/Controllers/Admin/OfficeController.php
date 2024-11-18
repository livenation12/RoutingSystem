<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Office\StoreOfficeRequest;
use App\Models\Office;
use App\Models\User;
use App\Http\Controllers\Controller;

class OfficeController extends Controller
{
    public function store(StoreOfficeRequest $request)
    {
        $office = $request->validated();
        Office::create($office);
        return to_route('admin.manage');
    }
    public function create()
    {
        $noOfficeUsers = User::getNoOfficeUsers();
        return inertia("Admin/Manage/Office/OfficeCreate", [
            'noOfficeUsers' => $noOfficeUsers
        ]);
    }

    public function edit(Office $office)
    {
        $noOfficeUsers = User::getNoOfficeUsers();
        return inertia("Admin/Manage/Office/OfficeEdit", [
            'office' => $office,
            'noOfficeUsers' => $noOfficeUsers
        ]);
    }
}
