@extends('layouts.master')

@section('title', 'i recomend')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/recomend.css") }}">
@endsection

@section('content')

  <section class="recomend container">
    <div class="recomend__body">
      <h3 class="recomend__title heading-third">I recomend</h3>

      <form class="recomend-card recomend-card--new">
        <div class="recomend-card__rationed">
          <div class="recomend-card__image">
            <button class="recomend-card__upload-button" type="button"><span class="material-icons-round">publish</span></button>
          </div>
        </div>
        <div class="recomend-card__content">
          <input class="recomend-card__input input-second" type="text" placeholder="place for your title">
          <textarea class="recomend-card__textarea textarea-second" placeholder="place for your description"></textarea>
          <div class="recomend-card__input-group">
            <input class="recomend-card__input recomend-card__input--link input-second type="text" placeholder="place for your link">
            <button class="recomend-card__button button-second" type="button">confirm</button>
          </div>
        </div>
      </form>

      <div class="recomend-card">
        <div class="recomend-card__rationed">
          <div class="recomend-card__image">
          </div>
        </div>
        <div class="recomend-card__content">
          <h5 class="recomend-card__title heading-fifth">Quick And Dirty Tips</h5>
          <p class="recomend-card__text text-fourth">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <a class="recomend-card__link heading-sixth" href="#">quickanddirtytips.com</a>
        </div>
      </div>

    </div>
  </section>

@endsection