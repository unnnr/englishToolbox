<template>
  <div class="profile__tab profile__editor">
    <h5 class="profile__tab-title heading-fifth">Your profile</h5>
    <button class="profile__tab-button profile__tab-button--exit text-fifth">sign out</button>
    <form class="profile__tab-editor profile__editor--disabled">

      <div class="profile__editor-header">
        <div class="profile__editor-image">
          <input type="file">
        </div>
        <h4 class="profile__editor-name heading-fourth">Your Name</h4>
        <button class="profile__tab-button profile__tab-button--edit-profile text-fifth">edit profile</button>
      </div>

      <div class="input-group-secondary input-group--active input-group--name">
        <div class="input-group__inner">
          <span class="input-group__title">Your name</span>
          <input placeholder="some name" class="input-group__input">
        </div>
      </div>

      <div class="input-group-secondary input-group--active input-group--email">
        <div class="input-group__inner">
          <span class="input-group__title">Your email</span>
          <input placeholder="some@email.com" class="input-group__input">
        </div>
      </div>

      <div class="profile__editor-footer">

        <div class="input-group-secondary input-group--password-new">
          <div class="input-group__inner">
            <span class="input-group__title">New passowrd</span>
            <input placeholder="Some placeholder" maxlength="64" novalidate="novalidate" type="password" class="input-group__input">
          </div>
          <button type="button" class="input-group__visibility"></button>
        </div>

        <div class="input-group-secondary input-group--password">
          <div class="input-group__inner">
            <span class="input-group__title">Confirm new passowrd</span>
            <input placeholder="Some placeholder" maxlength="64" novalidate="novalidate" type="password" class="input-group__input">
          </div>
        </div>

        <button class="button-secondary">confirm</button>
        <button class="profile__tab-button profile__tab-button--delete-profile text-sixth">delete profile</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  
}
</script>