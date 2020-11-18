<template>
   <div class="addition__tab editor">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">Audio editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
    
      <div class="input-group-secondary">  
        <div class="input-group__inner">
          <span class="input-group__title">Audio title<small class="input-group__counter">0/0</small></span>
          <input class="input-group__input"  type="text">
        </div>
      </div>

      <div class="textarea-group-secondary">  
        <span class="textarea-group__title">Custom description<small class="textarea-group__counter">0/180</small></span>
        <textarea class="textarea-group__textarea"></textarea>
      </div>

      <h6 class="editor__tag-title heading-sixth">Upload files</h6>

      <div class="editor__upload-inputs">

        <div class="input-group-secondary input-group--upload input-group--audio">  
          <div class="input-group__inner">
            <span class="input-group__title">audio</span>
            <input class="input-group__input"  type="file">
          </div>
        </div>

        <div class="input-group-secondary input-group--upload input-group--image">  
          <div class="input-group__inner">
            <span class="input-group__title">image</span>
            <input class="input-group__input"  type="file">
          </div>
        </div>
        
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