<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true,
        ]);
    }
}
