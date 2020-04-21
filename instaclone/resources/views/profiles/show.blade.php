@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-3 p-5">
            <img src="/storage/{{ $user->profile->profileImage() }}" style="width: 200px; height: 200px;" class="rounded-circle">
        </div>
        <div class="col-9 pt-5">
            <div class="d-flex align-items-baseline justify-content-between">
                <div class="d-flex align-items-center">
                    <h1 class="mr-3">
                        {{ $user->username }}
                    </h1>
                    @cannot('update', $user->profile)
                        <follow-button user-id="{{ $user->id }}" follows="{{ $follows }}"></follow-button>
                    @endcannot
                </div>
                <div>
                    @can('update', $user->profile)
                        <a href="/p/create">Add new post</a>
                    @endcan
                </div>
            </div>

            @can('update', $user->profile)
            <a href="/profile/{{ $user->id }}/edit">Edit Profile</a>
            @endcan

            <div class="d-flex">
                <div class="pr-5">
                    <strong>{{ $postCount }}</strong> posts
                </div>
                <div class="pr-5">
                    <strong id="followers-count">{{ $followersCount }}</strong> followers
                </div>
                <div class="pr-5">
                    <strong>{{ $followingCount }}</strong> following
                </div>
            </div>
            <div class="pt-4"><strong>{{ $user->profile->title }}</strong></div>
            <div>
                {{ $user->profile->description }}
            </div>
            <div>
                <a href="#">{{ $user->profile->url }}</a>
            </div>
        </div>
    </div>
    <div class="row">
        @foreach($user->posts as $post)
        <div class="col-4">
            <a href="/p/{{ $post->id }}">
                <img src="/storage/{{ $post->image }}" class="w-100 mt-4">
            </a>
        </div>
        @endforeach
    </div>
</div>
@endsection