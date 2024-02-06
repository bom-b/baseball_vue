<template>
  <div class="wrapper">
    <div class="title-box">
      <p id="title1" class="TheJamsil400 redWine">온라인</p>
      <p id="title2" class="TheJamsil700">숫자야구</p>
      <img id="baseball" class="mt-3" src="../assets/img/icon/7ball.png" alt="">
    </div>
    <div class="btn-box">
      <p id="title3" class="gray">전국의 사람들과 숫자야구를 즐겨보세요!</p>
      <div>
        <button class="btn-signature">혼자하기</button>
        <button class="btn-signature">같이하기</button>
      </div>
      <a class="mt-4">게임방법 알아보기</a>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
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
  padding: 30px;
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


@media (max-width: 768px) {
  .title-box {
    #title1 {
      font-size: 3rem;
    }

    #title2 {
      font-size: 5rem;
    }

    #baseball {
      width: 200px;
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