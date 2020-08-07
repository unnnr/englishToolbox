<section class="selected container">

  @include('components.player')

  <div class="addition">
    <div class="addition__wrapper">

      <div class="addition__body">

        <div class="addition__header">
          <button class="addition__header-button addition__header-button--active text-fourth">Description</button>
          <button class="addition__header-button text-fourth">Comments</button>
        </div>
  
        <div class="addition__tabs">

          <div class="addition__tab addition__tab--description">
            @include('components.description')
          </div>
          
          <div class="addition__tab addition__tab--comments">
            @include('components.comments')
          </div>

        </div>
  
        @include('components.editor')

      </div>

    </div>
  </div>

</section>