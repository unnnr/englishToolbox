<template>
  <section class="basement">
    <footer class="footer container">
      <div class="footer__wrapper footer__wrapper--first">
        <h5 class="footer__title heading-fifth">Contacts</h5>
        <div class="footer__inner">
          <div class="footer__segment footer__segment--first">
            <div class="footer__element">
              <i class="footer__icon fab fa-youtube"></i>
              <a href="#" class="footer__text text-fourth">youtube</a>
            </div>
            <div class="footer__element">
              <i class="footer__icon fab fa-twitter"></i>
              <a href="#" class="footer__text text-fourth">@twetter</a>
            </div>
            <div class="footer__element footer__element--last">
              <i class="footer__icon fab fa-facebook"></i>
              <a href="#" class="footer__text text-fourth">@facebook</a>
            </div>
          </div>
          <div class="footer__segment footer__segment--second">
            <div class="footer__element">
              <i class="footer__icon fas fa-envelope"></i>
              <a href="#" class="footer__text text-fourth">mailadress@mail.com</a>
            </div>
            <div class="footer__element">
              <i class="footer__icon fab fa-discord"></i>
              <a href="#" class="footer__text text-fourth">discord#3221</a>
            </div>
            <div class="footer__element footer__element--last">
              <i class="footer__icon fab fa-skype"></i>
              <a href="#" class="footer__text text-fourth">@skype</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__wrapper">
        <div class="footer__inner">
          <h5 class="footer__title heading-fifth">links</h5>
         <!--  @foreach (array_chunk($links, 3) as $section)
          <div class="footer__segment footer__segment--first">
            @foreach ($section as $link)
            <a
              href="{{ $link['url'] }}"
              class="footer__link footer__text text-fourth"
            >{{ $link['label'] }}</a>

            @endforeach
          </div>
          @endforeach -->
        </div>
      </div>
    </footer>
    <div class="copyright container">
      <p class="copyright__text">© Copyright 2020 *namehere* − All Rights Reserved</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'basement'
}
</script>