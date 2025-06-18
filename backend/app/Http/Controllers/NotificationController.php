<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index() : JsonResponse {
        
        return response()->json(Notification::with('user')->get());
    }

    public function store(Request $request) : JsonResponse {
        $data = $request->validate([
           
            'type'=>'required|string',
            'message'=>'required|string',
            'status'=>'required|string',
        ]);
        $data['user_id'] = Auth::user()->id;
        $notification = Notification::create($data);
        return response()->json($notification,201);
    }

    public function show($id) : JsonResponse {
        $notification = Notification::with('user')->findOrFail($id);
        return response()->json($notification);
    }

    public function update(Request $request,$id) : JsonResponse {
        $notification = Notification::findOrFail($id);
        $data = $request->validate([
            'type'=>'string',
            'message'=>'string',
            'status'=>'string',
        ]);
        $notification->update($data);
        return response()->json($notification);
    }

    public function destory($id) : JsonResponse {
        $notification = Notification::findOrFail($id);
        $notification->delete();
        return response()->json(null,204);
        
    }
}
