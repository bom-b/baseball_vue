<template>
  <div id="box">
    <h4 class="">계정을 확인중입니다.</h4>
    <p>{{json}}</p>
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
             this.json = response.data;
          })
          .catch(() => {
            this.$swal.fire('', '서버와의 연결이 원활하지 않습니다..', 'warning');
          });
    }
  }
}
</script>