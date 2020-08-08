@extends('layouts.master')

@section('title', 'i recomend')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/recomend.css") }}">
@endsection

@section('content')

  <section class="recomend container">
    <div class="recomend__header">
      <h3 class="recoment__title heading-third">I recomend</h3>
    </div>
    <div class="recomend__body">
      <div class="recomend__card">
        <div class="recomend__card-image"></div>
        <div class="recomend__card-content">
          <h5 class="recomend__card-title heading-fifth">Quick And Dirty Tips</h5>
          <p class="recomend__card-text text-fourth">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <a class="recomend__card-link heading-sixth" href="#">quickanddirtytips.com</a>
        </div>
      </div>
      <div class="recomend__card">
        <div class="recomend__card-image"></div>
        <div class="recomend__card-content">
          <h5 class="recomend__card-title heading-fifth">Quick And Dirty Tips</h5>
          <p class="recomend__card-text text-fourth">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <a class="recomend__card-link heading-sixth" href="#">quickanddirtytips.com</a>
        </div>
      </div>
      <div class="recomend__card">
        <div class="recomend__card-image"></div>
        <div class="recomend__card-content">
          <h5 class="recomend__card-title heading-fifth">Quick And Dirty Tips</h5>
          <p class="recomend__card-text text-fourth">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <a class="recomend__card-link heading-sixth" href="#">quickanddirtytips.com</a>
        </div>
      </div>
      <div class="recomend__card">
        <div class="recomend__card-image"></div>
        <div class="recomend__card-content">
          <h5 class="recomend__card-title heading-fifth">Quick And Dirty Tips</h5>
          <p class="recomend__card-text text-fourth">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <a class="recomend__card-link heading-sixth" href="#">quickanddirtytips.com</a>
        </div>
      </div>
    </div>
  </section>

@endsection