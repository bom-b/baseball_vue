<template>
  <div id="header">
    <main_header/>
  </div>
  <div id="main">
    <router-view/>
  </div>
</template>
<script>
import main_header from '@/components/header/main-header.vue';

export default {
  components: {
    main_header
  }
}
</script>
<style>
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
</style>
