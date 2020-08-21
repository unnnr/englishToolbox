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
  <video-details></video-details>  

@endsection
