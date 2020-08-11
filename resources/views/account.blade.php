@extends('layouts.master')

@section('title', 'account')

@section('css')
<link rel="stylesheet" href="{{ asset("css/account.css") }}">
@endsection

@section('content')

<section class="management container">
  <div class="management__tab management__tab--account">
    <h3 class="management__title heading-third">My account</h3>
    <form class="management__body">
      <div class="management__account-header">
        <div class="management__account-photo"></div>
        <div class="management__account-wrapper">
          <h3 class="management__account-name heading-third">Lana Parkes</h3>
          <button class="management__account-edit-button text-fourth"><span class="material-icons">edit</span>edit
            account</button>
        </div>
      </div>
      <label class="management__account-label heading-fifth" for="">Profile name</label>
      <div class="management__account-input-group">
        <input class="management__account-input input-second" type="text" placeholder="Lana Parkes">
        <span class="management__account-input-icon material-icons-round">account_circle</span>
      </div>
      <label class="management__account-label heading-fifth" for="">Email</label>
      <div class="management__account-input-group">
        <input class="management__account-input input-second" type="text" placeholder="lanaparkes@gmail.com">
        <span class="management__account-input-icon material-icons-round">email</span>
      </div>
      <label class="management__account-label heading-fifth" for="">Password</label>
      <div class="management__account-input-group management__account-input-group--margined">
        <input class="management__account-input input-second" type="text" placeholder="new password">
        <span class="management__account-input-icon material-icons-round">enhanced_encryption</span>
        <button class="management__account-visibility-button">
          <span
            class="management__account-input-icon management__account-input-icon--visibility material-icons-round">visibility_off</span>
        </button>
      </div>
      <div class="management__account-input-group">
        <input class="management__account-input input-second" type="text" placeholder="confirm new password">
        <span class="management__account-input-icon material-icons-round">lock</span>
      </div>
      <label class="management__account-label heading-fifth" for="">Confirmation</label>
      <div class="management__account-input-group management__account-input-group--margined">
        <input class="management__account-input input-second" type="text" placeholder="current password">
        <span class="management__account-input-icon material-icons-round">check</span>
      </div>
      <button class="management__account-button button-second">confirm changes</button>
      <button class="management__account-delete-button text-fourth"><span
          class="material-icons">delete_forever</span>delete account</button>
    </form>
  </div>
  <div class="management__tab management__tab--comments">
    <h3 class="management__title heading-third">My comments</h3>
    <div class="management__tab-content">
      <div class="management__body">
        <button class="management__comments-delete-all-button text-fourth"><span
            class="material-icons">delete_forever</span>delete all</button>
        <div class="managment__comment">
          <div class="managment__comment-image"></div>
          <div class="managment__comment-body">
            <h6 class="managment__comment-title heading-sixth">Lorem ipsum dolor</h6>
            <p class="managment__comment-text text-sixth">Sit amet justo donec enim diam vulputate ut. Egestas pretium
              aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.</p>
            <time class="managment__comment-date">19 may 2020</time>
          </div>
          <button class="managment__comment-delete-button"><span class="material-icons">delete_forever</span></button>
        </div>
        <div class="managment__comment">
          <div class="managment__comment-image"></div>
          <div class="managment__comment-body">
            <h6 class="managment__comment-title heading-sixth">Lorem ipsum dolor</h6>
            <p class="managment__comment-text text-sixth">Sit amet justo donec enim diam vulputate ut. Egestas pretium
              aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.</p>
            <time class="managment__comment-date">19 may 2020</time>
          </div>
          <button class="managment__comment-delete-button"><span class="material-icons">delete_forever</span></button>
        </div>
        <div class="space"></div>
      </div>
    </div>
  </div>
</section>
 
@endsection