@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @foreach($profiles as $profile)
        <div class="col-md-4 p-3">
            <div class="card shadow" style="width: 17rem;">
                <img class="card-img-top" src="/storage/{{ $profile->profileImage() }}">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">{{ $profile -> username($profile->user_id) }}</h5>
                        <p>
                            <strong>{{ $profile->followers->count() }}</strong> followers, <strong>{{ $profile->postCount($profile->user_id) }}</strong> posts
                        </p>
                    </div>
                    <a class="btn btn-primary" href="/profile/{{ $profile->user_id }}">Go to profile</a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    {{ $profiles->links() }}
</div>
@endsection