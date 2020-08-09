@extends('layouts.content')

@section('title', 'videos')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/videos.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src=" {{ asset('js/videos.js') }}"></script>
@endsection

@section('selected')

 @include('components.videoPlayer')

  <video-addition></video-addition>

@endsection

{{-- @section('pool')

  @include('components.newCard', [
    'cardMargin' => 'card--margin',
    'contentType' => 'video'
  ])

  @foreach ($videos as $video)
    @include('components.card', [
      'cardRatio' => 'card--rectangle',
      'cardMargin' => 'card--margin',
      'card' => $video
    ])
  @endforeach

@endsection --}}