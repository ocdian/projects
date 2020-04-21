<?php

namespace App\Http\Controllers;

use App\Profile;
use Intervention\Image\Facades\Image;
use App\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class ProfilesController extends Controller
{
    public function index()
    {
        $profiles = Profile::where('user_id','!=',auth()->user()->id)->orderBy('followersCount', 'DESC')->paginate(6);
        return view('profiles.index', compact('profiles'));
    }

    public function show(User $user)
    {
        //we're checking if the id of the user we passed in exists in the following of the authenticated user
        $follows = (auth()->user()) ? auth()->user()->following->contains($user->id) : false;
        $postCount = $user->posts->count();
        $followersCount = $user->profile->followers->count();
        $followingCount = $user->following->count();
        return view('profiles.show', compact('user', 'follows', 'postCount', 'followersCount', 'followingCount'));
    }

    public function edit(User $user)
    {
        return view('profiles.edit', compact('user'));
    }

    public function update(User $user)
    {
        $this->authorize('update', $user->profile);
        $data = request()->validate([
            'title' => 'required',
            'description' => 'required',
            'url' => 'url',
            'image' => ''
        ]);
        

        if (request('image')) {

            $imagePath = request('image')->store('profile', 'public');
            $image = Image::make(public_path("storage/{$imagePath}"))->fit(1000, 1000);
            $image->save();
            $data = array_merge($data, ['image'=>$imagePath]);
        }
        auth()->user()->profile->update($data);

        return redirect('/profile/' . $user->id);
    }
}
