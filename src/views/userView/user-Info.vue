<template>
  <div id="box">
    <div id="title-box">
      <p id="title" class="TheJamsil400">{{userInfo.nickname}}님의 프로필</p>
    </div>
    <div id="gray-box">
      <div id="img-box" class="">
        <div class="row">
          <div class="col-5">
            <img id="thumbnail" class="mt-3" :src="userInfo.profileImgUrl"/>
          </div>
          <div id="file-btn-box" class="col-7">
            <p id="img-title" class="TheJamsil400" style="">전적</p>
            <div class="img-content">
              <p class="img-sub" style="">
                {{userInfo.total}}전
                {{userInfo.win}}승
                {{userInfo.lose}}패
              </p>
              <p class="img-sub" style="color: darkred">승률 {{userInfo.winningPer}}%</p>
            </div>
            <p id="img-title" class="TheJamsil400 mt-4" style="">혼자하기 최고기록</p>
            <div class="img-content">
              <p class="img-sub" style="">{{userInfo.bestRecord4}}턴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-link to="/user/update">
        <button id="submit-btn" class="btn-signature">프로필 수정하기</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        id: '',
        nickname: '',
        profileImgUrl: '',
        total: 0,
        win: 0,
        lose: 0,
        winningPer: 0,
        bestRecord4: 100,
      }
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/member/getProfileInfo')
          // 토큰을 통해 사용자의 정보를 받아오기
          .then((response) => {
            this.userInfo.id = response.data.id;
            this.userInfo.nickname = response.data.nickname;
            this.userInfo.profileImgUrl = this.$s3BaseURL + "/user/profileImg/" + this.userInfo.id;
            this.userInfo.total = response.data.total;
            this.userInfo.win = response.data.win;
            this.userInfo.lose = response.data.lose;
            this.userInfo.bestRecord4 = response.data.bestRecord4;
          })
    }
  }
}
</script>
<style scoped>
#title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10vh;

  #title {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
}

.sub-title {
  font-size: 1.5rem;
}

#box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#gray-box {
  background-color: rgb(246, 246, 246);
  width: 1000px;
  padding: 50px 100px;
}

#img-box {
}

#img-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.img-sub {
  margin-bottom: 0;
}

.img-content{
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 300px;
}

#file-btn-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

#thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover; /* 이미지 비율 유지하면서 요소 채우기 */
}

.file-btn {
  background-color: #e7e7e7;
  color: #8a2b3e;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 20px;
  min-height: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.file-btn:hover {
  background-color: #dedede;
  color: #8a2b3e;
}

#submit-btn {
  margin-top: 50px;
}

@media (max-width: 1000px) {
  #gray-box {
    width: 100vw;
    padding: 5vh 10vw;
  }
}

@media (max-width: 768px) {
  .img-content{
    min-width: 30vw;
  }

  #img-title {
    font-size: 1.1rem;
  }

  #thumbnail {
    width: 30vw;
    height: 30vw;
  }

  #submit-btn {
    margin-top: 3vh;
  }

}
</style>