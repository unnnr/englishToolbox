@extends('layouts.master')

@section('content')
    
  <div class="order-wrapper">
    {{-- @include('sections.filter') --}}
    <filter-bar></filter-bar>

    <section class="selected container">

      <overlay
        src="{{ asset("img/svg/selected-overlay.svg") }}">
      </overlay>

      @yield('selected')

    </section>

  </div>

  <pool></pool>

@endsection