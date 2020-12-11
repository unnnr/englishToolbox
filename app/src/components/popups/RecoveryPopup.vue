<template>
  <div class="modal">
    <div class="modal__content alert alert--recovery">

      <div class="alert__header">
        <span class="alert__title heading-fifth">Password recovery</span>
        <button class="alert__button-close"></button>
      </div>

      <p class="alert__description text-fifth">
        We sent the confirmation code to your email.
        <span>If you need to resend the code, <u>click here</u>.</span>
        <!-- <span class="alert__description--resended">Confirmation code has been resended.</span> -->
      </p>

      <div class="input-group-secondary input-group--code">
        <div class="input-group__inner">
          <span class="input-group__title">You confirmation code</span>
          <input placeholder="Some placeholder" maxlength="64" novalidate="novalidate" type="password" class="input-group__input">
        </div>
      </div>

      <div class="input-group-secondary input-group--password-new">
        <div class="input-group__inner">
          <span class="input-group__title">New password</span>
          <input placeholder="Some placeholder" maxlength="64" novalidate="novalidate" type="password" class="input-group__input">
        </div>
        <button type="button" class="input-group__visibility"></button>
      </div>

      <div class="input-group-secondary input-group--password">
        <div class="input-group__inner">
          <span class="input-group__title">Confirm new password</span>
          <input placeholder="Some placeholder" maxlength="64" novalidate="novalidate" type="password" class="input-group__input">
        </div>
      </div>

      <button class="button-secondary">Confirm</button>

    </div>
  </div>
</template>

<script>
export default {
  
}
</script>