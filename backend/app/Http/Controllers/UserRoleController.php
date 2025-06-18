<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function attach(Request $request,$userId,$roleId) : JsonResponse {
            $userRole = UserRole::create([
                'user_id'=>$userId,
                'role_id'=>$roleId
            ]);
            return response()->json($userRole,201);
    }

    public function detach($userId,$roleId) : JsonResponse {
        $userRole = UserRole::where('user_id',$userId)->where('role_id',$roleId)->findOrFail();
        $userRole->delete();
        return response()->json(null,204);

        
    }

    public function idnex($userId) : JsonResponse {

        $userRoles = UserRole::where('user_id',$userId)->with('role')->get();
        return response()->json($userRoles);
        
    }
}
