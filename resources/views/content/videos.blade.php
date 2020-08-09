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

  {{-- <div class="addition">
   <div class="addition__body">

      <div class="addition__wrapper">

        @include('components.videoEditor')

        
        <div class="addition__info">

          <div class="addition__header">
            <button class="addition__header-button addition__header-button--active text-fourth">Description</button>
            <button class="addition__header-button text-fourth">Comments</button>
          </div>
    
          <div class="addition__tabs">
  
            <div class="addition__tab addition__tab--description">
              @include('components.description')
            </div>
            
            <div class="addition__tab addition__tab--comments">
              @include('components.comments')
            </div>
  
          </div>
        </div>

      </div>

    </div>
  </div> --}}

  <video-addition></video-addition>

@endsection

@section('pool')

  @include('components.newCard', ['cardMargin' => 'card--margin', 'contentType' => 'video'])

  @foreach ($videos as $video)
    @include('components.card', ['cardRatio' => 'card--rectangle', 'cardMargin' => 'card--margined','card' => $video])
  @endforeach

@endsection