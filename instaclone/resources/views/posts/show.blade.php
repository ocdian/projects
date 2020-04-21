@extends('layouts.app')

@section('content')
@php
$current_user = $post->user;
@endphp

<div class="container">
    <div class="row">
        <div class="col-8">
            <img class="w-100" src="/storage/{{ $post->image }}">
        </div>
        <div class="col-4">
            <div class="d-flex align-items-center">
                <div>
                    <a href="/profile/{{ $current_user->id }}">
                        <img src="/storage/{{ $current_user->profile->profileImage() }}" style="width: 40px; height:40px;" class="rounded-circle">
                    </a>
                </div>
                <div class="pl-3">
                    <div>
                        <a class="text-dark font-weight-bold" style="text-decoration: none"  href="/profile/{{ $current_user->id }}">
                            <span>{{ $current_user->username }}</span>
                        </a>
                    </div>
                </div>
                <div class="pl-3">
                </div>
            </div>
            <hr>
            <div class="pt-4">
                <a class="text-dark font-weight-bold" style="text-decoration: none" href="/profile/{{ $current_user->id }}">
                    <span>{{ $current_user->username }}</span>
                </a>
                <span>{{ $post->caption }}</span>
            </div>
        </div>
    </div>
</div>
@endsection