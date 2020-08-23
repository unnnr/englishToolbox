@extends('layouts.master')

@section('title', 'homepage')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/home.css") }}">
@endsection

@section('content')

{{-- <section class="modal modal--alert container">
  <div class="alert alert--error">
    <span class="alert__header text-second"></span>
    <p class="alert__description text-fifth">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium fusce id velit ut tortor pretium.</p>
    <div class="alert__buttons">
      <button class="alert__button alert__button--cancel">cancel</button>
      <button class="alert__button alert__button--confirm">Confirm</button>
      <button class="alert__button alert__button--okay">got it</button>
    </div>
  </div> 
</section> --}}

<section class="banner container">
  <div class="banner__carousel"></div>
</section>

<section class="updates container">
  <div class="feed">
    <h3 class="feed__title heading-third">Latest updates</h3>

    @include('components.card')
    @include('components.card')
    @include('components.card')
    @include('components.card')

  </div>
</section>

<section class="popular container">
  <div class="feed">
    <h3 class="feed__title heading-third">The most popular</h3>

    @include('components.card', ['cardType' => 'card--big'])
    @include('components.card', ['cardType' => 'card--big'])
    @include('components.card', ['cardType' => 'card--big'])

  </div>
</section>

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

<section class="reviews container">
  <h2 class="reviews__title heading-second">Student reviews</h2>
  <div class="reviews__cards">
    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--half"></div>
        </div>
        <span class="reviews__card-rating">4.5</span>
      </div>
    </div>
    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--half"></div>
          <div class="reviews__card-star"></div>
        </div>
        <span class="reviews__card-rating">3.5</span>
      </div>
    </div>
    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--half"></div>
        </div>
        <span class="reviews__card-rating">4.5</span>
      </div>
    </div>
    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--half"></div>
        </div>
        <span class="reviews__card-rating">4.5</span>
      </div>
    </div>
  </div>
  <button class="reviews__leave-review-button text-third">leave a review</button>
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