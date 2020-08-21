@extends('layouts.master')

@section('title', 'register')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/register.css") }}">
@endsection

@section('content')
  <section class="sign-up container">
    <form class="auth" method="POST" action="{{ route('register') }}">
      @csrf
      <h4 class="auth__title heading-fourth">Sing up</h4>
      <div class="auth__input-group auth__input-group--account">
        <input class="auth__input input-main" type="text" name="name" placeholder="your name" required>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group auth__input-group--email auth__input-group--success">
        <input class="auth__input input-main" type="email" name="email" placeholder="your email" required>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group auth__input-group--password">
        <input class="auth__input input-main" type="password" name="password" placeholder="your password" required>
        <button class="auth__input-visibility-button material-icons-round" type="button">visibility</button>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group auth__input-group--password">
        <input class="auth__input input-main" type="password" name="password_confirmation" placeholder="repeat password" required>
        <small class="auth__input-error"></small>
      </div>
      <button class="auth__input-button button-main" type="submit">confirm</button>
      <div class="login-with">
        <p class="login-with__text text-fourth">Or login with</p>
        <div class="login-with__buttons">
          <button class="login-with__button" type="button"><i class="login-with__icon login-with__icon--google fab fa-google"></i></button>
          <button class="login-with__button " type="button"><i class="login-with__icon login-with__icon--facebook fab fa-facebook"></i></button>
          <button class="login-with__button" type="button"><i class="login-with__icon login-with__icon--twetter fab fa-twitter"></i></button>
        </div>
        <a href="#" class="login-with__link text-fourth">Already have an account?</a>
      </div>
    </form>
    <div class="form__poster">
      <object class="form__img" data="{{ asset("img/svg/register.svg") }}" type="image/svg+xml"></object>
    </div>
  </section>

  <section class="register-overlay">
    <object class="register-overlay__image" data="{{ asset("img/svg/register-overlay.svg") }}" type="image/svg+xml"></object>
  </section>
@endsection