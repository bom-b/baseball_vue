<template>
  <div id="box">
    <h4 class="">계정을 확인중입니다.</h4>
<!--    <p style="font-size: 8px;">{{json}}</p>-->
  </div>
</template>
<style scoped>
#box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      code: '',
      json: ''
    }
  },
  created() {
    this.code = this.$route.query.code;
    this.getToken();
  },
  methods: {
    getToken() {
      const self = this;
      self.$axiosWithoutValidation.get('/kakao/kakaoLogin/' + self.code)
          .then((response) => {
             // 로그인 처리
            if(response.data.isSign === "true") {
              const userInfo = {
                'id' : response.data.id,
                'nickname' : response.data.nickname
              }
              window.localStorage.clear();
              window.localStorage.setItem('jwtToken', response.data.token);
              window.localStorage.setItem('user', JSON.stringify(userInfo));
              this.$router.push({path: '/'});

              // 회원가입 시키러 보내기
            } else {
              const oi = {
                'type': 'kakao',
                'data': response.data.ki
              }
              window.localStorage.setItem('oi', JSON.stringify(oi));
              this.$router.push({path: '/singUp/singup_with_oauth'});
            }

          })
          .catch(() => {
            this.$swal.fire('', '올바르지 않은 요청입니다.', 'warning');
          });
    }
  }
}
</script>