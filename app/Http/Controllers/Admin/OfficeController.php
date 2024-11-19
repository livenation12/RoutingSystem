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
        // Validate the request and get the validated data
        $officeRequest = $request->validated();

        // Create the office record in the database
        $office = Office::create($officeRequest);

        // List of assigned users (office head and official alternate)
        $assignedUsers = [$officeRequest['officeHeadId'], $officeRequest['officialAlternateId']];

        // Assign each user to the newly created office
        foreach ($assignedUsers as $userId) {
            // If a valid user ID is provided, assign the office to the user
            if (!empty($userId)) {
                // Find the user (or fail if not found)
                $user = User::findOrFail($userId);
                // Update the user's officeId
                $user->officeId = $office->id;
                // Save the user record
                $user->save();
            }
        }

        // Redirect to the 'admin.manage' route after storing the office
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
