<?php

namespace App\Http\Controllers;

use App\Profile;
use App\User;
use Illuminate\Http\Request;

class FollowsController extends Controller
{
    
    public function __construct()
    {
        $this->middleware("auth");
    }

    public function store(User $user) 
    {
        //toggle the following relationship between the currently authenticated user and the profile of the user we pass
        $response = auth()->user()->following()->toggle($user->profile);
        $state = $response['attached'];
        $profile = Profile::where('user_id', $user->id)->first();
        if (count($state) > 0) {
            $profile->followersCount++;
        }
        else $profile->followersCount--;
        $profile->save();
        return $response;
    }

}
