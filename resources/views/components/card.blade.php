<div class="card {{{ $cardType ?? ''}}} {{{ $cardMargin ?? '' }}}">
  <div class="card__image">
    <div class="card__header">
      <button class="card__favorite-button">
        <span class="card__favorite-icon material-icons-round">favorite</span>
      </button>
      <div class="card__views">
        <span class="card__views-icon material-icons-round">visibility</span>
        <span class="card__views-count">1337</span>
      </div>
    </div>
    <h5 class="card__title heading-fifth">Lorem ipsum dolor</h5>
  </div>
  <p class="card__text text-third">{{{ isset($video) && $video->description }}}</p>
  <div class="card__footer">
    <div class="card__tags">
      <div class="card__tag-secondary card__tag tag tag--circle">
        <div class="card__tag-tooltip tooltip">
          <div class="tooltip__arrow"></div>
          <span class="tag__name" for="cb2">nequeLaoreet</span>
        </div>
      </div>
      <div class="card__tag-secondary card__tag tag tag--circle">
        <div class="card__tag-tooltip tooltip">
          <div class="tooltip__arrow"></div>
          <span class="tag__name" for="cb2">nequeLaoreet</span>
        </div>
      </div>
      <button class="card__tag-main tag tag--main" type="button">
        <span class="tag__name" for="cb2">nequeLaoreet</span>
      </button>
    </div>
    <time class="card__date">July 19 2020</time>
  </div>
</div>