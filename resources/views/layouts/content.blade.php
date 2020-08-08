@extends('layouts.master')

@section('content')
    
  @include('sections.filter')

  <section class="selected container">
    @yield('selected')
  </section>


  <pool></pool>
  {{-- <section class="pool container">
    @yield('pool')
  </section> --}}

@endsection