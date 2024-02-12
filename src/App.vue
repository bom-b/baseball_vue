<template>
  <div id="header">
    <component :is="headerComponent"/>
  </div>
  <div id="main">
    <router-view/>
  </div>
</template>
<script>
import {mapState} from "vuex";
import main_header from '@/components/header/main-header.vue';
import single_header from '@/components/header/single-header.vue'

export default {
  watch: {
  },
  methods: {
  },
  computed: {
    ...mapState(['headerType']),
    headerComponent() {
      if (this.headerType === "home") {
        return main_header;
      } else if (this.headerType === "single") {
        return single_header;
      }

      return null;
    },
  },
};
</script>
<style>
@import 'animate.css';

#header {
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 60px);
  margin: 0 auto;
  padding: 0;
  max-width: 1000px;
  overflow: auto;
  background: white;
}

@media (max-width: 1000px) {

}
</style>
