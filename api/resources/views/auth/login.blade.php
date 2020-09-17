@extends('layouts.master')

@section('title', 'login')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/login.css") }}">
@endsection

@section('js')
 <script type="text/javascript" src=" {{ asset('js/login.js') }}"></script>
@endsection

@section('content')
  <login-section></login-section>
@endsection
