<template>
  <section class="games container">
    <div class="games__selected">
      <div class="matcher" ref="canvas">
        <div class="matcher__progress-bar">
          <div class="matcher__progress-bar-current"></div>
        </div>

        <div class="matcher__controls">
          <button class="matcher__element matcher__exit-button"></button>
          <div class="matcher__element matcher__timer">100sec</div>
          <div class="matcher__element matcher__counter">35/35</div>
        </div>

        <div class="matcher__results">
          <div class="matcher__results-body">
            <div class="matcher__results-scrollable">
              <h4 class="matcher__results-heading heading-fourth">
                well done!
              </h4>
              <p class="matcher__results-time text-fourth">
                Your time: <span>15:69</span>
              </p>
              <table class="matcher__results-table">
                <tr>
                  <th>№</th>
                  <th>infinitive</th>
                  <th>past simple</th>
                  <th>past participle</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
              </table>
              <button class="matcher__results-restart-button button-secondary">again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Matcher from "@services/matcher/Matcher";

export default {
  mounted() {
    let canvas = this.$refs.canvas;

    this.game = new Matcher(canvas);

    this.game.start();
  },
};
</script>

<style lang="sass">
.matcher
  position: absolute
  width: 100%
  height: 100%

.matcher canvas
  width: 100%
  height: 100%
</style>
