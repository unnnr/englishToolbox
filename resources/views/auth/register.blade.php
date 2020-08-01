@extends('layouts\master')

@section('title', 'register')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/min/register.min.css") }}">
@endsection

@section('content')
  <section class="sign-up container">
    <form class="auth">
      <h4 class="auth__title heading-fourth">Sing up</h4>
      <div class="auth__input-group">
        <input class="auth__input input-main" type="text" placeholder="your name">
        <span class="auth__input-icon auth__input-icon--type material-icons-round">account_circle</span>
        <span class="auth__input-icon auth__input-icon--alarm material-icons-round">new_releases</span>
        <small class="auth__input-error">Your error here</small>
      </div>
      <div class="auth__input-group">
        <input class="auth__input input-main" type="email" placeholder="your email">
        <span class="auth__input-icon auth__input-icon--type material-icons-round">email</span>
        <span class="auth__input-icon auth__input-icon--success material-icons-round">verified</span>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group">
        <input class="auth__input input-main" type="password" placeholder="your password">
        <span class="auth__input-icon auth__input-icon--visibility material-icons-round">visibility</span>
        <span class="auth__input-icon auth__input-icon--type material-icons-round">lock</span>
        <span class="auth__input-icon material-icons-round"></span>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group">
        <input class="auth__input input-main" type="password" placeholder="repeat password">
        <span class="auth__input-icon auth__input-icon--type material-icons-round">lock</span>
        <span class="auth__input-icon material-icons-round"></span>
        <small class="auth__input-error"></small>
      </div>
      <button class="auth__input-button button-main">confirm</button>
      <div class="login-with">
        <p class="login-with__text text-fourth">Or login with</p>
        <div class="login-with__buttons">
          <a href="#" class="login-with__button login-with__button--first"><i
              class="login-with__icon login-with__icon--google fab fa-google"></i></a>
          <a href="#" class="login-with__button login-with__button--second"><i
              class="login-with__icon login-with__icon--facebook fab fa-facebook"></i></a>
          <a href="#" class="login-with__button login-with__button--third"><i
              class="login-with__icon login-with__icon--twetter fab fa-twitter"></i></a>
        </div>
        <a href="#" class="login-with__link text-fourth">Already have an account?</a>
      </div>
    </form>
    <div class="form__poster">
      <object class="form__img" data="/public/img/svg/signup.svg" type="image/svg+xml"></object>
    </div>
  </section>
@endsection