@extends('layouts.master')

@section('title', 'account')

@section('css')
<link rel="stylesheet" href="{{ asset("css/account.css") }}">
@endsection

@section('content')

<section class="management container">

  <div class="management__tab management__tab--account">
    <h3 class="management__tab-header heading-third">My account</h3>
    @include('components.account.account')
  </div>

  <div class="management__tab management__tab--comments">
    <h3 class="management__tab-header heading-third">My comments</h3>
    @include('components.account.comments')
  </div>

</section>

<section class="reviews-management container">
  <h3 class="heading-third">Reviews manage</h3>
  <div class="reviews-management__body">
    
    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">5.0</span>
      </div>
      <div class="reviews__card-button-group">
        <button class="reviews__card-button reviews__card-button--delete button-second">delete</button>
        <button class="reviews__card-button reviews__card-button--apply button-second">apply</button>
      </div>
    </div>

    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">5.0</span>
      </div>
      <div class="reviews__card-button-group">
        <button class="reviews__card-button reviews__card-button--delete button-second">delete</button>
        <button class="reviews__card-button reviews__card-button--apply button-second">apply</button>
      </div>
    </div>

    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">5.0</span>
      </div>
      <div class="reviews__card-button-group">
        <button class="reviews__card-button reviews__card-button--delete button-second">delete</button>
        <button class="reviews__card-button reviews__card-button--apply button-second">apply</button>
      </div>
    </div>

    <div class="reviews__card">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half" data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half" data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">5.0</span>
      </div>
      <div class="reviews__card-button-group">
        <button class="reviews__card-button reviews__card-button--delete button-second">delete</button>
        <button class="reviews__card-button reviews__card-button--apply button-second">apply</button>
      </div>
    </div>

  </div>
</section>

<section class="favorites container">
  <h3 class="heading-third">Favorite list</h3>
  <div class="pool pool--four-columns">

    @include('components.card')
    @include('components.card')
    @include('components.card')
    @include('components.card')

  </div>

</section>
 
@endsection