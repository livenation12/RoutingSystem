<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

abstract class Controller
{
    // Default page count for pagination
    protected $pageCount = 10;

    /**
     * Apply search filters to a query builder.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function applySearchFilter(Builder $query, $search)
    {
        if ($search) {
            $query->whereHas('proposal', function ($query) use ($search) {
                $query->where('trackingId', 'like', "%$search%")
                    ->orWhere('title', 'like', "%$search%")
                    ->orWhere('source', 'like', "%$search%");
            });
        }
        return $query;
    }
}
