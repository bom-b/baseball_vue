<template>
  <div id="box">
    <div id="title-box">
      <p id="title" class="TheJamsil400">회원가입</p>
    </div>
    <div id="gray-box">
      <div id="nickname-box">
        <p class="TheJamsil400 sub-title">닉네임</p>
        <p class="TheJamsil300" style="color: gray">한글, 영어, 숫자(0-9), 특수문자(-)</p>
        <input class="form-control">
      </div>
      <div id="img-box" class="">
        <p class="TheJamsil400 sub-title">프로필 사진</p>
        <div class="row">
          <div class="col-6">
            <div id="thumbnail" class="mt-3">
            </div>
          </div>
          <div id="file-btn-box" class="col-6" >
            <p id="img-comment" class="TheJamsil300" style="color: gray">나중에 수정할 수 있습니다.</p>
            <button class="file-btn">사진 업로드</button>
          </div>
          <div class="col-6">

          </div>
        </div>
      </div>
    </div>
    <div >
      <button id="submit-btn" class="btn-signature">가입하기</button>
    </div>
  </div>
</template>
<script setup>

</script>
<style scoped>
#title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10vh;

  #title {
    font-size: 2rem;
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
  background-color: rgba(246, 246, 246, 0.65);
  width: 1000px;
  padding: 50px 100px;
}

#nickname-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

#img-box {
  margin-top: 100px;
}

#file-btn-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.form-control {
  width: 500px;
}

#thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #8a2b3e;
  object-fit: cover; /* 이미지 비율 유지하면서 요소 채우기 */
}

.file-btn {
  background-color: #f1f1f1;
  color: #8a2b3e;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 20px;
  min-height: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.file-btn:hover {
  background-color: #e7e7e7;
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
  #img-comment {
    font-size: 0.7em;
  }

  #img-box {
    margin-top: 7vh;
  }

  .form-control {
    width: 70vw;
  }

  .sub-title {
    font-size: 1.2rem;
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