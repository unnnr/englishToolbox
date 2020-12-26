<template>
  <div class="whiteboard__group whiteboard__group--users">
    <div class="whiteboard__group-inner">
      <div class="whiteboard__element whiteboard__element--square whiteboard__element--small">
        <button 
          class="whiteboard__button-control"
          :class="{'whiteboard__button-control--unlock': !!!locked,
                   'whiteboard__button-control--lock': locked}"
          @click="toggleLock">
        </button>
      </div>

      <div class="whiteboard__element whiteboard__element--small">
        <button 
          class="whiteboard__button-online"
          @click="toggle">

          <span class="whiteboard__online-count">{{ usersCount }}</span> `users` online
          
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="opened"
        v-click-outside="close"
        class="whiteboard__users-dropdown whiteboard__users-dropdown--bannable">

        <div 
          class="whiteboard__user"
          v-for="user of users"
          :key="user.id">

          <div 
            class="whiteboard__user-avatar"
            :style="{'background-image': 'url(' + user.avatar + ')'}">
          </div>

          <p class="whiteboard__user-name text-fifth">{{ user.name }}</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  inject: ['$drawings'],

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
      return this.drawings._collection.locked;
    },

    users() {
      return this.drawings.users();
    },
    
    usersCount() {
      return this.users.length
    }
  },

  methods: {
    unlock() {
      this.drawings.unlock();
    },

    lock() {
      this.drawings.lock();
    },

    toggleLock() {
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