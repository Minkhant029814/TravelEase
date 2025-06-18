<?php

namespace App\Http\Controllers;

use App\Models\TravelTip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TravelTipController extends Controller
{
        public function index() : JsonResponse {
            return response()->json(TravelTip::all());
        }

        public function store(Request $request) : JsonResponse {
            
            $data =  $request->validate([
                'title'=>'required|string',
                'content'=>'required|string',
                'category'=>'required|string',
                'image'=>'nullable|image|max:2048',
            ]);
            
            if($request->hasFile('image'))
            {
                $data['image'] = $request->file('image')->store('travel_tips','public');
            }

            $travelTip = TravelTip::create($data);
            return response()->json($travelTip,201);
        }

        public function show($id) : JsonResponse{

            $travel_tip = TravelTip::findOrFail($id);
            return response()->json($travel_tip);
            
        }

        public function update(Request $request,$id) : JsonResponse {

            $travel_tip = TravelTip::findOrFail($id);
            $data = $request->validate([
                'title'=>'string',
                'content'=>'string',
                'category'=>'string',
                'image'=>'nullable|image|max:2048'
            ]);

            if($request->hasFile('image'))
            {
                if($travel_tip->image) Storage::delete($travel_tip->image);
                $data['image'] = $request->file('image')->store('travel_tips','public');
            }

            $travel_tip->update($data);
            return response()->json($travel_tip);
            
        }

        public function destroy($id) : JsonResponse{
            $travel_tip = TravelTip::findOrFail($id);
            if($travel_tip->image) Storage::delete($travel_tip->image);
            $travel_tip->delete();
            return response()->json(null,204);
            
        }
}
