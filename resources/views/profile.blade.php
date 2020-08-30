@extends('layouts.master')

@section('title', 'account')

@section('css')
<link rel="stylesheet" href="{{ asset("css/account.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src=" {{ asset('js/profile.js') }}"></script>
@endsection

@section('content')

<section class="management container">

  <div class="management__tab management__tab--account">
    <h3 class="management__tab-header heading-third">My account</h3>
    <profile-editor></profile-editor>
  </div>

  <div class="management__tab management__tab--comments">
    <h3 class="management__tab-header heading-third">My comments</h3>
    <profile-comments></profile-comments>
  </div>

</section>

<reviews></reviews>

<section class="favorites container">
  <h3 class="heading-third">Favorite list</h3>
  <div class="pool pool--four-columns">

    {{-- @include('components.card')
    @include('components.card')
    @include('components.card')
    @include('components.card')
 --}}
  </div>

</section>
 
@endsection