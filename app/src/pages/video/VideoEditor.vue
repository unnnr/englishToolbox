<template>
   <div class="addition__tab editor">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">Video editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
      
      <div class="input-group-secondary">  
        <div class="input-group__inner">
          <span class="input-group__title">Youtube link<small class="input-group__counter">0/0</small></span>
          <input class="input-group__input" placeholder="https://www.youtube.com" type="text">
        </div>
      </div>

      <div class="textarea-group-secondary">  
        <span class="textarea-group__title">Custom description<small class="textarea-group__counter">0/180</small></span>
        <textarea class="textarea-group__textarea"></textarea>
      </div>

      <h6 class="editor__tag-title heading-sixth">Add tags<span class="editor__tag-counter">0/5</span></h6>

      <div class="tags">
        <button type="button" class="tag">consectetur</button>
        <button type="button" class="tag">adipiscing</button>
        <button type="button" class="tag">petronat</button>
        <button type="button" class="tag">derber</button>
        <button type="button" class="tag">doits</button>
        <button type="button" class="tag">tetrat</button>
        <button type="button" class="tag">fonter</button>
        <button type="button" class="tag">petrelet</button>
        <button type="button" class="tag">huynia</button>
      </div>


    </div>
    <div class="addition__tab-footer editor__footer">
      <button class="editor__delete-button button-secondary button--reddish"></button>
      <button class="editor__confirm-button button-secondary">Confirm</button>
    </div>
  </div>
</template>