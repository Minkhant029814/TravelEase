<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
     public function index() : JsonResponse{
        return response()->json(Role::all());
     }

     public function store(Request $request) : JsonResponse {
        
        $data = $request->validate([
            'name'=>'required|string',
          
        ]);

        $role = Role::create($data);
        return response()->json($role,201);
     }

     public function update(Request $request,$id) : JsonResponse {
      $role = Role::findOrFail($id);
      $data = $request->validate([
         'name'=>'string',
       
      ]);
       $role->update($data);
       return response()->json($role);
      
     }

     public function destroy($id) : JsonResponse {

      $role = Role::findOrFail($id);
      $role->delete();
      return response()->json(null,204);
      
     }
        
     
}
