@extends('layouts.content')

@section('title', 'videos')

@section('css')
<link rel="stylesheet" href="{{ asset("css/videos.css") }}">
@endsection

@section('js')
<script type="text/javascript" src=" {{ asset('js/videos.js') }}"></script>
@endsection

@section('pool')

<section class="pool container">

  @include('components.newCard', ['cardMargin' => 'card--margin', 'contentType' => 'video'])

  @foreach ($videos as $video)
  @include('components.card', ['cardRatio' => 'card--rectangle', 'cardMargin' => 'card--margin','card' => $video])
  @endforeach

</section>


@endsection