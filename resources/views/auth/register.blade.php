@extends('layouts.master')

@section('title', 'register')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/register.css") }}">
@endsection

@section('js')
 <script type="text/javascript" src=" {{ asset('js/register.js') }}"></script>
@endsection

@section('content')
  <register-section></register-section>

  {{-- <section class="register-overlay">
    <object class="register-overlay__image" data="{{ asset("img/svg/register-overlay.svg") }}" type="image/svg+xml"></object>
  </section> --}}

@endsection