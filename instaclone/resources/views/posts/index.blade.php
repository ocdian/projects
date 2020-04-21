@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @if($hasFollowing)
        @foreach($posts as $post)
        @php
        $current_user = $post->user;
        @endphp
        <div class="col-md-4 p-3">
            <a href="/p/{{ $post->id }}">
                <div class="card shadow" style="width: 20rem;">
                    <img class="card-img-top" src="/storage/{{ $post->image }}">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">
                                <a class="text-dark font-weight-bold" style="text-decoration: none" href="/profile/{{ $current_user->id }}">
                                    <span>{{ $current_user->username }}</span>
                                </a>
                            </h5>
                            <p style="height: 4rem; overflow-y:scroll;">
                                {{ $post->caption }}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        @endforeach
    </div>
    {{ $posts->links() }}
    @else
    <p style="color: #c2ceda;">Looks like you aren't following anybody, or maybe no one you follow has posted yet. Open up the Profiles Index from your menu to follow other people!</p>
    @endif
</div>
@endsection