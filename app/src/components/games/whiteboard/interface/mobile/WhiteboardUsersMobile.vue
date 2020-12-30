<template>
  <div class="whiteboard__group-mobile whiteboard__group-mobile--users">
    <div class="whiteboard__group-inner">
      <div class="whiteboard__element--square whiteboard__element--small whiteboard__element">
        <button 
          class="whiteboard__button-control"
          :class="{'whiteboard__button-control--unlock': !!!locked,
                   'whiteboard__button-control--lock': locked}"
          @click="toggleLock">
        </button>
      </div>
      
      <div class="whiteboard__element--small whiteboard__element">
        <button 
          class="whiteboard__button-online text-fifth"
          @click="toggle">

            <span class="whiteboard__online-count">{{ usersCount }}</span> online
        </button>
      </div>
    </div>

    <transition name="fade">
      <div 
        v-if="opened"
        v-click-outside="close"
        class="whiteboard__users-dropdown-mobile "
        :class="{'whiteboard__users-dropdown-mobile--bannable': admin}">
        
        <div 
          v-for="user of users"
          :key="user.id"

          class="whiteboard__user-mobile"
          :class="{'whiteboard__user--banned': user.banned,
                   'whiteboard__user--persistent': user.admin}">

          <div 
            class="whiteboard__user-avatar"
            :style="{'background-image': 'url(' + user.avatar + ')'}"
            @click="tryToBan(user)">>
          </div>
          
          <p class="whiteboard__user-name text-fifth">{{ user.name }}</p>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import Bans from '@models/Bans'
import bus from '@services/eventbus'

export default {
  inject: ['$drawings', '$locked', '$admin'],

  data() {
    return {
      opened: false
    }
  },

  computed: {
    drawings() {
      return this.$drawings();
    },

    locked() {
      return this.$locked();
    },

    admin() {
      return this.$admin();
    },

    users() {
      return this.drawings.users();
    },
    
    usersCount() {
      return this.users.length
    }
  },

  methods: {
    tryToBan(user) {
      if (user.banned || !!!this.admin || user.admin)
        return;

      bus.dispatch('alert-warning', {
        message: user.name + ' will be banned',
        okay: this.ban.bind(this, user)
      });
    },

     async ban(user) {
      let data = new FormData();
      data.append('user', user.id);
      data.append('reason', 'Messes up whiteboard');
        
      await Bans.create(data);

      user.banned = true;
    },

    unlock() {
      this.drawings.unlock();
    },

    lock() {
      this.drawings.lock();
    },

    toggleLock() {
      if (!!!this.admin)
        return;

      if (this.locked)
        this.unlock();
      else
        this.lock();
    },

    close() {
      this.opened = false;
    },

    toggle() {
      this.opened = !!!this.opened;
    }
  }
}
</script>

<style lang="sass" scoped>

.whiteboard__user--banned .whiteboard__user-avatar:before
  content: "block"
  cursor: pointer
  opacity: 1

.whiteboard__user--persistent .whiteboard__user-avatar:before
  cursor: default !important
  opacity: 0 !important
  
</style>