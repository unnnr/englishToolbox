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
@endsection