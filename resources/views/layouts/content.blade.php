@extends('layouts.master')

@section('content')
    
  <div class="order-wrapper">
    @include('sections.filter')

    <section class="selected container">
      @yield('selected')
    </section>

  </div>

  <pool></pool>

@endsection