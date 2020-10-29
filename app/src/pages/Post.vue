<template>
  <main>
    <post-selected>

      <template #player>
        <div style="display: flex; position: absolute; width: 100%;">
          <div 
            v-for="(color, index) in colores"
            :key="index"
            :style="{
              'flex-grow': 1,
              'height': '300px',
              'background': color,
              'color': 'white',
              'writing-mode': 'vertical-lr',
              'padding': '5px',
              'font-size': '14px'
            }">

            {{ color }}
          </div>
        </div>
      </template> 

      <template #editor>
        <post-editor/>
      </template>

    </post-selected>

    <pool/>

  </main>
</template>

<script>
import PostSelected from '@components/posts_new/PostSelected'
import PostEditor from '@components/posts_new/PostEditor_TEMP'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    PostSelected,
    PostEditor,
    Pool
  },

  computed: {
    colores() {
      let colores = [];
      let count = 10;
      let step = 14;

      for (let i = 0; i < count; i++)
      {
        let red = 0 + i * step;
        let green = 0 + i * step;
        let blue = 10 + i * step;


        let color = `rgb(${red}, ${green}, ${blue})`
         color = '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0');
        colores.push(color);
      }

      return colores;
    }
  }
}
</script>