<template>
  <nav class="navbar navbar-expand" style="min-height: 60px;">
    <div class="container-fluid">
      <div id="logo-box">
        <router-link to="/">
<!--          <button class="goHome-btn">그만하기</button>-->
          <img id="baseball" class="mt-3" src="../../assets/img/icon/7ball_77x77.png" alt="" width="40">
          <button class="bg-transparent">
            <span class="TheJamsil400 redWine">온라인</span>
            <span class="TheJamsil400">숫자야구</span>
          </button>
        </router-link>
      </div>
      <p>no~</p>
    </div>
  </nav>
</template>
<style scoped>
* {
  user-select: none;
}

nav {
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  width: 1000px;
  background: white;
}

.container-fluid {
  text-align: center;
}

img {
  margin-top: 0 !important;
}

.bg-transparent {
  border: none;
  font-size: 22px;
  margin-left: 10px;
}

.goHome-btn {
  background-color: #f1f1f1;
  color: #8a2b3e;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 20px;
  min-height: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.goHome-btn:hover {
  background-color: #e7e7e7;
  color: #8a2b3e;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
  }

  .bg-transparent{
    display: none;
  }
}

</style>
<script setup>

</script>
