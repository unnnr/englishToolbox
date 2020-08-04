@extends('layouts.content')

@section('title', 'videos')

@section('css')
  <link rel="stylesheet" href="{{ asset("css/videos.css") }}">
@endsection

@section('js')
  <script type="text/javascript" src=" {{ asset('js/videos.js') }}"></script>
@endsection


@section('selected')

  <section class="selected container">
    <div class="selected__player">
      <div class="selected__rationed">
        <iframe class="selected__video" temp-src="https://www.youtube.com/embed/5qap5aO4i9A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div class="selected__player-overlay">
          <object class="selected__overlay-image" data="{{ asset("img/svg/player-overlay.svg") }}" type="image/svg+xml"></object>
        </div>
      </div>
    </div>
    <div class="selected__addition">
      {{-- <div class="selected__description">
      </div>
      <div class="selected__comments">
      </div> --}}
      <form class="selected__editor" action="{{ route('videos') }}" method="POST">
        @csrf
        <div class="selected__editor-header">
          <h6 class="selected__editor-title heading-sixth">New video</h6>
        </div>
        <div class="selected__editor-body">
          <label class="selected__editor-label text-fourth">YouTube link</label>
          <input class="selected__editor-input input-second" type="text" name ='url' required>
          <label class="selected__editor-label text-fourth">Custom description</label>
          <textarea class="selected__editor-textarea input-second" name='description'></textarea>
        </div>
        <div class="selected__editor-footer">
          <button class="selected__editor-button button-second" type="submit">confirm</button>
        </div>
      </form>
    </div>
    <div class="selected__footer">
      <h2 class="selected__title heading-third">Lorem ipsum dolor</h2>
      <div class="selected__elements">
        <div class="tag selected__tag">
          <div class="tag__icon">
            <div class="tooltip tag__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon">
            <div class="tooltip tag__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon"></div>
          <span class="tag__name">tag name</span>
        </div>
        <span class="selected__date">April 17 2020</span>
        <div class="selected__views">
          <span class="selected__views-icon material-icons-round">visibility</span>
          <span class="selected__views-count">1289</span>
        </div>
      </div>
    </div>

  </section>

@endsection


@section('pool')

  <section class="pool container">

    <div class="post-card post-card--rectangle">
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
        <div class="tag">
          <div class="tag__icon">
            <div class="tooltip tag__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon">
            <div class="tooltip tag__tooltip">
              <div class="tooltip__arrow"></div>
              <div class="tag">
                <div class="tag__icon"></div>
                <span class="tag__name">tag name</span>
              </div>
            </div>
          </div>
          <div class="tag__icon"></div>
          <span class="tag__name">tag name</span>
        </div>
        <span class="post-card__date">July 19 2020</span>
      </div>
    </div>

  </section>


@endsection
