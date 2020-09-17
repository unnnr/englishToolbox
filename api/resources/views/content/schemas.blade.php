@extends('layouts.content')

@section('title', 'schemas')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/schemas.css") }}">
@endsection

@section('js')
@endsection

@section('selected')

 @include('components.schemasPlayer')

  <div class="addition">
    <div class="addition__body">

      <div class="addition__wrapper">

        @include('components.schemasEditor')
        
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
  </div>

@endsection

@section('pool')

@endsection