<section class="navbar container">
  <div class="navbar-desktop">
    <nav class="navbar-desktop__links">
      <a href="{{ route('home') }}" class="navbar-desktop__logo">Name</a>
      
      @foreach ($links as $link)
        <a href="{{ $link['url'] }}" class="navbar-desktop__link">{{ $link['label'] }}</a>
      @endforeach

    </nav>
    <div class="navbar-desktop__aside">
      <a href="{{ '#' }}" class="navbar-desktop__aside-link navbar-desktop__aside-link--login-in">login in</a>
      <a href="{{'#' }}" class="navbar-desktop__aside-link navbar-desktop__aside-link--sign-up">sing up</a>
      <!-- <a href="#" class="navbar-desktop__account-link"><span class="material-icons-round">account_circle</span></a> -->
    </div>
  </div>

  <div class="navbar-mobile">
    <button class="navbar-mobile__button navbar-mobile__button--show"><span class="material-icons-round">menu</span></button>
    <a href="{{ route('home') }}" class="navbar-mobile__logo">Namehere</a>
    <nav class="navbar-mobile__links">
      <div class="navbar-mobile__header">
        <!-- <a href="#" class="navbar-mobile__account-link"><span class="material-icons-round">account_circle</span></a> -->
        <button class="navbar-mobile__button navbar-mobile__button--hide"><span class="material-icons-round">clear</span></button>
      </div>
      
      <a href="{{ route('home') }}" class="navbar-mobile__link">Name</a>

      @foreach ($links as $link)
        <a href="{{ $link['url'] }}" class="navbar-mobile__link">{{ $link['label'] }}</a>
      @endforeach

      <div class="navbar-mobile__footer">
        <a href="{{ route('login') }}" class="navbar-mobile__footer-link navbar-mobile__footer-link--login-in">login in</a>
        <a href="{{ route('register') }}" class="navbar-mobile__footer-link navbar-mobile__footer-link--sign-up">sing up</a>
      </div>
    </nav>
    <div class="navbar-mobile__overlay"></div>
  </div>
</section>