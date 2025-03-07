<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Http\Resources\FolderResource;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $folders = Folder::where('user_id',$user->id)
            ->latest()
            ->paginate(15);

        return FolderResource::collection($folders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => ['required','string']
        ]);

        Folder::create([
            'name' => $data['name'],
            'directory_id' => rand(1111111, 9999999),
            'user_id' => $user->id,
        ]);

        return response([
            'message' => 'Folder Created.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $folder = Folder::where('directory_id', $id)->first();

        if($folder) {
            return new FolderResource($folder);
        }

        return response([
            'error' => 'Invalid folder'
        ],422);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $folder = Folder::where('directory_id', $id);

        if($folder->first()) {
            $folder->update([
                'name' => $request->name
            ]);

            return response([
                'message' => 'Folder updated'
            ]);
        }

        return response([
            'error' => 'Invalid folder'
        ],422);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $folder = Folder::where('directory_id', $id);

        if($folder->first()) {
            $folder->delete();

            return response([
                'message' => 'Folder deleted'
            ]);
        }

        return response([
            'error' => 'Invalid folder'
        ],422);
    }
}
