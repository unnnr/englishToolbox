<template>
  <div class="games__pool pool">

    <card
      v-for="(game, index) of games"
      :key="index"

      :loading="false"
      :title="game.name"

      :selected="isSelected(game)"
      :imageasda="game.image"
      @select="select(game)"/>

  </div>
</template>

<script>
import Card from '@components/cards/EmptyCard'

export default {
  components: {
    Card
  },
  
  data() {
    return {
      games: [
        { name: 'Whiteboard', loader: () => import('@components/games/Whiteboard'), image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Recorder',   loader: () => import('@components/games/Recorder'),   image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Matcher',    loader: () => import('@components/games/Matcher'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Builder',    loader: () => import('@components/games/Builder'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Bubbles',    loader: () => import('@components/games/Bubbles'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Verbs',      loader: () => import('@components/games/Verbs'),      image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
      ],

      selected: null,
    }
  },

  mounted() {
    this.select(this.games[2]);
    let image = new Image();

    image.src = 'img/hq720.webp';

    image.onload = () => {
      for (let el of this.$el.querySelectorAll('.card__image')) {
        var width = image.width;
        var height = image.height;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        let angle = (Math.random() * 360) * Math.PI / 180;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -width / 2,  -height / 2, width, height);
        ctx.rotate(-angle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        let url = canvas.toDataURL();
        Object.assign(el.style, {
          'background-image': 'url(' + url+ ')',
          'background-size': (180 + Math.random() * 500) +'%',
        });
      }
    }

  
  },

  methods: {
    async select(game) {
      let module = await game.loader();
      let component = module.default;

      this.selected = game;
      this.$emit('select', component);
    },

    isSelected(game) {
      return this.selected === game;
    }
  }
}
</script>