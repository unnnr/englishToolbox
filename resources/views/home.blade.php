@extends('layouts.master')

@section('title', 'homepage')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/home.css") }}">
@endsection

@section('content')

<section class="banner container">
  <div class="banner__carousel"></div>
</section>

<section class="updates posts container">
  <h3 class="posts__title heading-third">Latest updates</h3>
  <div class="posts__content">

  </div>
</section>

<section class="popular posts container">
  <h3 class="posts__title heading-third">The most popular </h3>
  <div class="posts__content">

  </div>
</section>

<section class="posts container">
  <div class="posts__content">
    <div class="post-card post-card--square">
      <div class="post-card__image">
        <div class="post-card__header">
          <button class="post-card__favorite-button">
            <span class="post-card__favorite-icon post-card__favorite-icon--active material-icons-round">favorite</span>
          </button>
          <div class="post-card__views">
            <span class="post-card__views-icon material-icons-round">visibility</span>
            <span class="post-card__views-count">1337</span>
          </div>
        </div>
        <div class="post-card__title heading-fifth">Post card title</div>
      </div>
      <div class="post-card__text text-third">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm
        odtempor incididunt morbi leo.</div>
      <div class="post-card__footer">
        <div class="tag post-card__tag">
          <div class="tag__icon post-card__tag-icon">
            <div class="tooltip post-card__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon post-card__tag-icon">
            <div class="tooltip post-card__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon post-card__tag-icon"></div>
          <span class="tag__name">tag name</span>
        </div>
        <span class="post-card__date">July 19 2020</span>
      </div>
    </div>
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
    <div class="reviews__card reviews__card--first">
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
    </div>
    <div class="reviews__card reviews__card--second">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum.</p>
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
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">4.5</span>
      </div>
    </div>
    <div class="reviews__card reviews__card--third">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt.</p>
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
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">4.0</span>
      </div>
    </div>
    <div class="reviews__card reviews__card--fourth">
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">Person Name</h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
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
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
          <div class="reviews__card-star">
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_left.svg" type="image/svg+xml"></object>
            <object class="reviews__card-star-half reviews__card-star-half--unselected"
              data="/public/img/svg/star_right.svg" type="image/svg+xml"></object>
          </div>
        </div>
        <span class="reviews__card-rating">3.5</span>
      </div>
    </div>
  </div>
</section>
@endsection