@extends('layouts.master')

@section('title', 'account')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/account.css") }}">
@endsection

@section('content')

<section class="management container">
  <div class="management__tab--account">
    <h3 class="management__title heading-third">My account</h3>
    <div class="management__body">
      <div class="management__account-header">
        <div class="management__account-photo"></div>
      </div>
    </div>
  </div>
  <div class="management__tab--comments">
    <h3 class="management__title heading-third">My comments</h3>
    <div class="management__body">

    </div>
  </div>
</section>

@endsection