@extends('layouts.content')

@section('title', 'videos')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/audio.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src=" {{ asset('js/audio.js') }}"></script>
@endsection


@section('selected')

  <audio-player></audio-player>
  <audio-details></audio-details>  

@endsection