<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class SimpleAuthController extends Controller
{
    public function register(Request $request) : JsonResponse{
        $data = $request->validate([
            'name'=>'required|string',
            'email'=>'required|email|unique:users',
            'password'=>'required|string',
            'role'=>'required|string',
        ]);
        $data['password']=bcrypt($data['password']);
        
        $user = User::create($data);
        $role = Role::firstOrCreate(['name'=>$data['role']]);
        UserRole::create([
            'user_id'=>$user->id,
            'role_id'=>$role->id,
        ]);

        $token = $user->createToken('api_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'status'=>true,
            'role'=>$data['role'],
            'token'=>$token
        ],201);
        
    }

    public function login(Request $request) :JsonResponse{

         $request->validate([
            'email'=>'required|exists:users',
            'password'=>'required',
        ]);

        $user = User::where('email',$request->email)->first();

        if(!$user ||  !Hash::check($request->password,$user->password)) {
           return response()->json( [
            'message'=>'invalid credentials',
           ]);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user'=>$user,
            'status'=>true,
            'token'=>$token,
            'message'=>'login successfully',
            'role'=>$user->roles()->first()->name,
        ]);
    }

    public function logout(Request $request):JsonResponse  {

        $user = $request->user();
        if(!$user) {
            return response()->json([
                'message'=>'UnAuthenticated.'
            ],401);
        }

        $user->currentAccessToken()?->delete();
        return response()->json([
            'message'=>'logged out successfully',
        ]);
        
        
    }
}
