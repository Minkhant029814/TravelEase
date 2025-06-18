<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    public function index() : JsonResponse {
        return response()->json(Activity::all());
    }

    public function store(Request $request) : JsonResponse {
        
        $data = $request->validate([
            'destination_id'=>'required|exists:destinations,id',
            'name'=>'required|string',
            'image'=>'nullable|image|max:2048',
        ]);
        if($request->hasFile('image')) {
            $data['image']= $request->file('image')->store('activities','public');
        }

        $activity = Activity::create($data);
        return response()->json($activity,201);
    }

    public function show($id) : JsonResponse{
        $activity = Activity::findOrFail($id);
        return response()->json($activity);
        
    }

    public function update(Request $request,$id) : JsonResponse {
        $activity = Activity::findOrFail($id);
        $data = $request->validate([
            'destination_id'=>'exists:destinations,id',
            'name'=>'string',
            'image'=>'nullable|image|max:2048',
        ]);

        if($request->hasFile('image')) {
            if($activity->image) Storage::delete($activity->image);
            $data['image'] = $request->file('image')->store('activities','public');
        }

        $activity->update($data);
        return response()->json($activity);
        
    }

    public function destroy($id) : JsonResponse {
        $activity = Activity::findOrFail($id);
        if($activity->image) Storage::delete($activity->image);
        $activity->delete();
        return response()->json(null,204);
        
    }
}
