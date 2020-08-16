@extends('layouts.content')

@section('title', 'videos')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/videos.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>
  <script type="text/javascript" src=" {{ asset('js/videos.js') }}"></script>
  <script type="text/javascript" src=" {{ asset('js/main.js') }}"></script>
@endsection

@section('selected')

  <video-player></video-player>
  <video-addition></video-addition>  

  <div class="context">
    <button class="context__item">Edit</button>
    <button class="context__item">refresh</button>
    <button class="context__item">Delete</button>
  </div>

@endsection
