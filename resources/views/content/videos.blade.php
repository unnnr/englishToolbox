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

  <div class="addition">
    <div class="addition__wrapper">

      <div class="addition__body">

        <video-editor></video-editor>
        {{-- @include('components.videoEditor') --}}


        {{-- HEAR MUST BE WRAPPER --}}
        <div class="addition__header">
          <button class="addition__header-button addition__header-button--active text-fourth">Description</button>
          <button class="addition__header-button text-fourth">Comments</button>
        </div>
  
        <div class="addition__tabs">

          <div class="addition__tab addition__tab--description">
            {{-- <video-info></video-info> --}}
            @include('components.description')
          </div>
          
          <div class="addition__tab addition__tab--comments">
            @include('components.comments')
          </div>

        </div>
        {{-- HEAR MUST BE WRAPPER ENDING--}}

     
      </div>

    </div>
  </div>

@endsection

@section('pool')

  @include('components.newCard', ['cardMargin' => 'card--margin', 'contentType' => 'video'])

  @foreach ($videos as $video)
    @include('components.card', ['cardRatio' => 'card--rectangle', 'cardMargin' => 'card--margin','card' => $video])
  @endforeach

@endsection