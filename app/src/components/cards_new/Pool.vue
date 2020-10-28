<template>
  <transition-group 
    class="pool container pe"
		tag="section"
  	name="list"
    @before-leave="setAbsolute">

    <new-card :key="-1"/>

    <card 
      v-for="post in posts"
      :key="post.id"
      :class="{'card--selected': post.selected }"
      
      :description="post.description"
      :createdAt="post.createdAt"
      :title="post.title"
      :views="post.views"
      :img="post.thumbnail"


      @select="select(post)"

      rectangular/>a
      
      <!-- v-context:items="createContext" -->


  </transition-group>
</template>

<script>
import HandlePostSelection from '@mixins/HandlePostSelection'
import HandlePostCreation from '@mixins/HandlePostCreation'
import HandleEvents from '@mixins/HandleEvents'
import NewCard from '@components/cards_new/NewCard'
import Card from '@components/cards_new/Card'

import FormatedDate from '@services/FormatedDate'
import Faker from 'faker/locale/ja'


export default {
  components: {
    NewCard,
    Card
  },

  mixins: [ 
    HandlePostSelection,
    HandlePostCreation,
    HandleEvents
  ],

  data() {
    return {
      posts: []
    }
  },

  mounted() {
    window.createPost = 
    () => this.TEMP_createPost();

    this.posts = this.TEMP_generatePosts();

    this.listen({
      'post-created': this.onCreated
    })
  },

  methods: {
    setAbsolute(target) {
			Object.assign(target.style, {
				position: 'absolute',
				width: target.offsetWidth + 'px',
				top: target.offsetTop + 'px',
				left: target.offsetLeft + 'px'
			})
    },

    createContext() {
      return [	{   
					label: 'Open',
					action: () => 
						bus.dispatch('card-selecting', { card: this })
				}]
    },

    TEMP_generateImage() {
      return Faker.image.image();
    },

    TEMP_generateTitle() {
      return Faker.lorem.sentence();
    },

    TEMP_generateDescription() {
      return Faker.lorem.paragraph();
    },

    TEMP_generateViews() {
      return Faker.random.number(10);
    },

    TEMP_generateDate() {
      return FormatedDate.parse(Faker.date.past());
    },

    TEMP_generatePosts() {
      let posts = [];
      let count =  Faker.random.number(10);

      for (let i = 0; i < count; i++)
        posts.push(this.TEMP_createPost());

      return posts;
    },

    TEMP_createPost() {
      return {
        id: Faker.random.number(1000),
        thumbnail: this.TEMP_generateImage(),
        title: this.TEMP_generateTitle(),
        description: this.TEMP_generateDescription(),
        views: this.TEMP_generateViews(),
        createdAt: this.TEMP_generateDate()
      };
    }
  }
}
</script>


<style>

.pool {
	position: relative;
	overflow: hidden;
}

.list-move {
  transition: transform 1s ease-in-out,
  						opacity 1s ease-in-out;
}

.list-enter-active
{
   -webkit-animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.list-leave-active {
	-webkit-animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

@-webkit-keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

@keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

</style>