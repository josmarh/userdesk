<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'directoryId' => $this->directory_id,
            'createdAt' => \Carbon\Carbon::create($this->created_at)->toFormattedDateString()
        ];
    }
}
