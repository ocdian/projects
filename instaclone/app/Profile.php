<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = [];

    public function profileImage() {
        return ($this->image) ? $this->image : 'images/default.png';
    }

    public function followers()
    {
        return $this->belongsToMany(User::class);
    }

    public function username($userId) {
        $user = User::find($userId);
        return $user->username;
    }

    public function postCount($userId) {
        $posts = Post::where('user_id', $userId)->get();
        return $posts->count();
    }

    public function user($user) {
        return $this->belongsTo(User::class);
    }
}
