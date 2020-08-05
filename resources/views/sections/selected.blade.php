<section class="selected container">

  @include('components.player')

  <div class="addition">
    <div class="addition__body">
      <div class="addition__header">
        <button class="addition__header-button addition__header-button--active text-fourth">Description</button>
        <button class="addition__header-button text-fourth">Comments</button>
      </div>

      @include('components.description')

      {{-- @include('components.comments') --}}

    </div>
  </div>

</section>