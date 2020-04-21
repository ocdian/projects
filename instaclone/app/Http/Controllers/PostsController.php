<?php

namespace App\Http\Controllers;
use App\Post;
use App\Profile;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function __construct()
    {
        //require every other single action here to go through authorization
        $this->middleware('auth');    
    }

    public function create() {
        return view('posts.create');
    }

    public function index()
    {
        //get the user ids of every user being followed by the currently authenticated user and
        //yeet them into the $users array
        $users = auth()->user()->following()->pluck('profiles.user_id');
        $hasFollowing = ($users->count()>0); 
        if ($hasFollowing) 
            $posts = Post::whereIn('user_id', $users)->with('user')->latest()->paginate(6);
        return view("posts.index", compact("posts","hasFollowing"));
    }

    public function store() {
        $data = request()->validate([
            'caption' => 'required',
            'image' => ['required','image']
        ]);
        $imagePath = request('image')->store('uploads', 'public');
        auth()->user()->posts()->create([
            'caption' => $data['caption'],
            'image' => $imagePath
        ]);

        $image = Image::make(public_path("storage/{$imagePath}"))->fit(1200,1200);
        $image->save();

        return redirect('/profile/'. auth()->user()->id);
    }

    public function show(\App\Post $post) {
        return view('posts.show', compact("post"));
    }
}
