<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller


{
    

    public function redirect($provider) {
            return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback($provider):JsonResponse
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
            $existingUser = User::where('email',$socialUser->email)->first();

        if ($existingUser){
            Auth::login($existingUser);
            $user=$existingUser;
        }else{
            if(!$socialUser->name){
                $user = User::create([
                'name'=>$socialUser->nickname,
                'email'=>$socialUser->email,
                'password' => Hash::make(\Str::random(16)),
                'provider_id'=>$socialUser->id,
                'provider_name'=>$provider,
            ]);
           
            }else{
                $user = User::create([
                'name'=>$socialUser->name,
                'email'=>$socialUser->email,
                'password' => Hash::make(\Str::random(16)),
                'provider_id'=>$socialUser->id,
                'provider_name'=>$provider,
            ]);
        }
        Auth::login($user);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user'=>$user,
            'token'=>$token
        ]);
        } catch (\Exception $e) {
            return response()->json([
                'error'=>'Authenticated failed:' . $e->getMessage()
            ],500);
            
        }
    }

    public function logout(Request $request): JsonResponse
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'message' => 'Unauthenticated.'
        ], 401);
    }

    $user->currentAccessToken()?->delete();

    return response()->json([
        'message' => 'Logged out successfully.',
    ]);
}

    
    
}
