<template>
  <nav class="navbar navbar-expand" style="min-height: 60px;">
    <div class="container-fluid">
      <div id="logo-box">

      </div>
      <div id="user-info-box">
        <img @click="kakaoLogin" id="kakao" class="mt-3" src="../../assets/img/btn/kakao_login_medium.png" alt="">
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav {
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
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
  cursor: pointer;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
  }
}

</style>
<script>
export default {
  methods: {
    kakaoLogin() {
      const REST_API_KEY = '5503b5836935e429191e7c53ce32baa2';
      const REDIRECT_URI = this.$vueBaseURL + '/singUp/kakaoJoin';

      // 새 창의 크기
      const width = 500;
      const height = 800;

      // 새 창의 옵션
      const windowFeatures = `width=${width},height=${height},resizable=yes,scrollbars=yes,status=yes`;
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`, 'kakaoLogin', windowFeatures;

    }
  }
}
</script>
