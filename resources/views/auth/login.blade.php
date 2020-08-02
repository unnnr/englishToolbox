<<<<<<< HEAD
<html>  

    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <form method="POST" action="{{ route('login') }}" >
            @csrf

            <input name="email" placeholder="Email" type="email" required>
            <input name="password" placeholder="Password" type="password" required>
            <input type="submit">
        </form>

         <style>
            body {
                display:flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-size: 16px;
            }

            form {
                width: 500px;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
            }

            form > input {
                margin: .5rem
              }


            input {
                border: none;
                background: hsl(0, 0%, 93%);
                border-radius: .25rem;
                padding: 1.25rem 1rem;
                font-family: sans-serif;
                font-size: 100%;
            }

            input[type="submit"] {
                background: hotpink;
                color: white;
                box-shadow: 0 .75rem .5rem -.5rem hsl(0, 50%, 80%);
            }
        </style>
    </body>
    
</html>
=======
@extends('layouts.master')

@section('title', 'login')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/login.css") }}">
@endsection

@section('content')
  <section class="login-in container">
    <form class="auth" method="POST" action="{{ route('login') }}">
      @csrf
      <h4 class="auth__title heading-fourth">login in</h4>
      <div class="auth__input-group">
        <input class="auth__input input-main"  name="email" type="email" placeholder="your email" required>
        <span class="auth__input-icon auth__input-icon--type material-icons-round">email</span>
        <small class="auth__input-error"></small>
      </div>
      <div class="auth__input-group">
        <input class="auth__input input-main" name="password" type="password" placeholder="repeat password" required>
        <span class="auth__input-icon auth__input-icon--type material-icons-round">lock</span>
        <small class="auth__input-error"></small>
      </div>
      <button class="auth__input-button button-main" type="submit">confirm</button>
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
        <a href="#" class="login-with__link text-fourth">Don't have an account?</a>
      </div>
    </form>
    <div class="form__poster form__poster--login-in">
      <object class="form__img" data="/public/img/svg/loginin.svg" type="image/svg+xml"></object>
    </div>
  </section>
@endsection
>>>>>>> 43aec4f90a6ba4294919e08b2b750572b82d658e
