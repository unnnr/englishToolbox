@extends('layouts.content')

@section('title', 'videos')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/audio.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src=" {{ asset('js/videos.js') }}"></script>
@endsection


@section('selected')

 @include('components.audioPlayer')

  <div class="addition">
    <div class="addition__wrapper">

      <div class="addition__body">

        <div class="addition__header">
          <button class="addition__header-button addition__header-button--active text-fourth">Description</button>
          <button class="addition__header-button text-fourth">Comments</button>
        </div>

        <div class="addition__tabs">

          <div class="addition__tab addition__tab--description">
            {{-- @include('components.description') --}}
          </div>

          <div class="addition__tab addition__tab--comments">
            @include('components.comments')
          </div>

        </div>

        {{-- @include('components.audioEditor') --}}

      </div>

    </div>
  </div>

@endsection

@section('pool')


@endsection