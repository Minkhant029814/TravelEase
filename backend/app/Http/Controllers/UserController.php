<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() : JsonResponse {
        
        return response()->json(User::all());

    }

    public function store(Request $request) : JsonResponse {
        
        $data = $request->validate([
            'name'=>'required|string',
            'email'=>'required|email|unique:users',
            'password'=>'required|string',
            
        ]);

        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        // $token = $user->createToken('api_token')->plainTextToken;
        return response()->json($user,201);
    }

    public function show($id) : JsonResponse {
        return response()->json(User::findOrFail($id));
        
    }

    public function update(Request $request,$id) : JsonResponse {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name'=>'string',
            'email'=>'email|unique:users,email,'.$id,
            'password'=>'string|min:6',
        ]);

        if(isset($data['password'])) {
            $data['password']  = Hash::make($data['password']);
        }

        $user->update($data);
        return response()->json($user);
        
    }

    public function destroy($id) : JsonResponse{
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null,204);
    }
}
