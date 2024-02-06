<template>
  <nav class="navbar navbar-expand" style="min-height: 60px;">
    <div class="container-fluid">
      <div id="logo-box">
        <img id="ball" class="mt-3" src="../../assets/img/icon/7ball.png" alt="">
      </div>
      <div id="user-info-box">
        <img id="kakao" class="mt-3" src="../../assets/img/btn/kakao_login_medium.png" alt="">
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav {
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  width: 1000px;
  background: white;
}

.container-fluid {
  text-align: center;
}

#ball {
  width: 35px;
}

img {
  margin-top: 0 !important;
}

#kakao {
  width: 80px;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
  }
}

</style>
<script setup>

</script>
