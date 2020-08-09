<div class="card {{{ $cardRatio ?? 'card--square'}}} {{{ $cardMargin ?? '' }}}">
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
    <h5 class="card__title heading-fifth">{{{ isset($video) && $video->title }}}</h5>
  </div>
  <p class="card__text text-third">{{{ isset($video) && $video->description }}}</p>
  <div class="card__footer">
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
    <time class="card__date">July 19 2020</time>
  </div>
</div>