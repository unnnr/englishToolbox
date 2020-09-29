@extends('layouts.master')

@section('title', 'homepage')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/home.css") }}">
@endsection

@section('js')
 <script type="text/javascript" src=" {{ asset('js/home.js') }}"></script>
@endsection

@section('content')

<banner-container></banner-container>

<updates-container></updates-container>

{{-- <section class="popular container">
  <div class="feed">
    <h3 class="feed__title heading-third">The most popular</h3>

  </div>
</section> --}}

<section class="about-me container">
  <div class="about-me__content">
    <div class="about-me__person">
      <div class="abot-me__photo">
        <h3 class="about-me__name heading-third">Irina Ivanova</h3>
      </div>
    </div>
    <div class="about-me__paragraph">
      <h2 class="about-me__title heading-first">About me</h2>
      <p class="about-me__text text-first">My name is Mary Cousins, lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at.
        Morbi tristique senectus et netus et malesuada fames ac turpis. Etiam sit amet nisl purus in mollis nunc sed.
      </p>
    </div>
  </div>
  <div class="about-me__merits">
    <div class="about-me__card about-me__card--first">
      <div class="about-me__wrapper">
        <div class="about-me__picture about-me__picture--first">
          <h4 class="about-me__merit heading-fourth">Nulla porttitor</h4>
        </div>
      </div>
      <div class="about-me__merit-text text-second">Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.</div>
    </div>
    <div class="about-me__card about-me__card--second">
      <div class="about-me__wrapper">
        <div class="about-me__picture about-me__picture--second">
          <h4 class="about-me__merit heading-fourth">Nulla porttitor</h4>
        </div>
      </div>
      <div class="about-me__merit-text text-second">Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.</div>
    </div>
    <div class="about-me__card">
      <div class="about-me__wrapper">
        <div class="about-me__picture about-me__picture--third">
          <h4 class="about-me__merit heading-fourth">Nulla porttitor</h4>
        </div>
      </div>
      <div class="about-me__merit-text text-second">Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.</div>
    </div>
  </div>
</section>

{{-- <section class="modal container">
  <form class="leave-review">
    <div class="leave-review__header">
      <h5 class="heading-fifth">Leave your review</h5>
      <button class="leave-review__close-button" type="button"></button>
    </div>
    <div class="leave-review__body">
      <label class="leave-review__label text-fourth" for="">Title of review</label>
      <input class="leave-review__input input-second" type="text" placeholder="your title">
      <label class="leave-review__label text-fourth" for="">Text of your review</label>
      <textarea class="leave-review__textarea textarea-second" placeholder="your review"></textarea>
      <label class="leave-review__label text-fourth" for="">Grade</label>
      <div class="leave-review__grade">
        <div class="leave-review__stars">
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--half">
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star">
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
            <object class="leave-review__half-star" data="{{ asset("img/svg/halfstar.svg") }}" type=""></object>
          </button>
        </div>
        <span class="leave-review__rating">4.5</span>
      </div>
    </div>
    <div class="leave-review__footer">
      <button class="leave-review__button button-second">Confirm</button>
    </div>
  </form>
</section> --}}

@endsection