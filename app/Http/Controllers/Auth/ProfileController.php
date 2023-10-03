<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Rules\MatchOldPassword;
use Spatie\Permission\Models\Role;
use Auth;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|max:50|string',
        ]);

        if($request->email !== $user->email) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'timezone_id' => $request->timezone
            ]);

            $message = 'logout';
        }else {
            $user->update([
                'name' => $request->name,
                'timezone_id' => $request->timezone
            ]);
            $message = 'Personal Information Updated.';
        }

        $user = Auth::user();

        return response([
            'user' => $user,
            'permissions' => $user->getUserRole(),
            'message' => $message
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required','max:31'],
            'confirm_password' => ['same:new_password']
        ]);

        $user->update(['password' => bcrypt($request->new_password)]);

        return response([
            'user' => $user,
            'message' => 'Password Updated.'
        ]);         
    }
}
