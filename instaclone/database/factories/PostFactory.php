<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'user_id' => rand(1, User::all()->count()),
        'caption' => $faker->sentence(),
        'image' => 'images/post.jpg'
    ];
});
