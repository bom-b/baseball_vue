<template>
  <div class="wrapper">
    <div class="title-box">
      <p id="title1" class="TheJamsil400 redWine" data-aos="fade-in" data-aos-duration="500" data-aos-delay="0">온라인</p>
      <p id="title2" class="TheJamsil700" data-aos="fade-in" data-aos-duration="500" data-aos-delay="200">숫자야구</p>
      <img id="baseball" class="mt-3" src="../assets/img/icon/7ball.png" alt="" data-aos="slide-down" data-aos-duration="500" data-aos-delay="300">
    </div>
    <div class="btn-box">
      <p id="title3" class="gray">전국의 사람들과 숫자야구를 즐겨보세요!</p>
      <div>
        <router-link to="/singlePlay">
          <button class="btn-signature">혼자하기</button>
        </router-link>
        <button class="btn-signature" @click="pleaseWait">같이하기</button>
      </div>
      <a class="mt-4" @click="pleaseWait">게임방법 알아보기</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    pleaseWait() {
     this.$swal.fire("","개발중이니 잠시만 기다려주세요!");
    }
  }
}
</script>
<style scoped>
* {
  user-select: none;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;

  #title1 {
    font-size: 4rem;
  }

  #title2 {
    font-size: 8rem;
  }

  #baseball {
    width: 250px;
    opacity: 30%;
  }
}

.btn-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
  background: #ffffff;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 800px;
  border-radius: 10px;

  #title3 {
    font-size: 1.2rem;
  }

}

.btn-signature {
  width: 120px;
  height: 80px;
  margin: 10px;
}

img {
  margin-top: 0 !important;
}


@media (max-width: 768px) {
  .title-box {
    margin-top: 5vh;

    #title1 {
      font-size: 2rem;
      margin-bottom: 0;
    }

    #title2 {
      font-size: 4rem;
    }

    #baseball {
      width: 140px;
    }
  }

  .btn-box {
    width: 80vw;
    margin-bottom: 5vh;

    #title3 {
      font-size: 1rem;
    }
  }
}

</style>