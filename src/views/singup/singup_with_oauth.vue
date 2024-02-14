<template>
  <div id="box">
    <div id="title-box">
      <p id="title" class="TheJamsil400">회원가입</p>
    </div>
    <div id="gray-box">
      <div id="nickname-box">
        <p class="TheJamsil400 sub-title">닉네임</p>
        <p class="TheJamsil300" style="color: gray">한글, 영어, 숫자(0-9), 특수문자(-)</p>
        <input v-model="nickname.inputBox" class="form-control">
        <p v-if="nickname.negative_res" class="mt-2" style="color: darkred; font-size: 0.8em;">{{
            nickname.negative_res
          }}</p>
        <p v-if="nickname.positive_res" class="mt-2" style="color: darkgreen; font-size: 0.8em;">{{
            nickname.positive_res
          }}</p>
      </div>
      <div id="img-box" class="">
        <p class="TheJamsil400 sub-title">프로필 사진</p>
        <div class="row">
          <div class="col-5">
            <img id="thumbnail" class="mt-3" :src="image.imgPreview"/>
          </div>
          <div id="file-btn-box" class="col-7">
            <p id="img-comment" class="TheJamsil300" style="color: gray">나중에 수정할 수 있습니다.</p>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;">
            <button class="file-btn" @click="triggerFileInput">사진 업로드</button>
          </div>
        </div>
      </div>
    </div>
    <p style="text-align: center; color: gray; font-size: 0.8em; margin-top: 5px; margin-bottom: 0;">부적절한 데이터 추가시 <br/>예고없이 계정이 삭제될 수 있습니다.</p>
    <div style="padding-bottom: 30px;">
      <button id="submit-btn" class="btn-signature" @click.capture="submitSingUP">가입하기</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: {
        inputBox: '',
        isOk: false,
        positive_res: '',
        negative_res: '',
      },
      image: {
        imgFile: null,
        imgPreview: this.$s3BaseURL + "/user/profileImg/default",
      }
    }
  },
  watch: {
    'nickname.inputBox'(newValue) {
      // 초기화
      this.nickname.isOk = false;
      this.nickname.negative_res = '';

      if(newValue.length === 0) {
        this.nickname.positive_res = '';
      }

      // 한글, 영어, 숫자, 특수문자(-) 이외의 문자가 있는지 확인
      if(newValue.length > 0) {
        if (!/^[\uAC00-\uD7A3A-Za-z0-9-]*$/g.test(newValue)) {
          this.nickname.positive_res = '';
          this.nickname.negative_res = '허용되지 않는 문자가 입력되었습니다.'
        } else {
          // 한글은 2글자로, 그 외의 문자는 1글자로 계산하여 총 길이를 구함
          let length = Array.from(newValue).reduce((total, char) => {
            return total + (char.match(/[\uAC00-\uD7A3]/) ? 2 : 1);
          }, 0);

          if (length > 15) {
            this.nickname.positive_res = '';
            this.nickname.negative_res = '최대 글자수를 초과하였습니다.';
          } else {
            // 조건을 다 충족 한다면,
            this.$axiosWithoutValidation
                .get(`auth/checkNicknameDuplication/${this.nickname.inputBox}`)
                .then((response) => {
                  let res = response.data;
                  if (res === 1) {
                    this.nickname.positive_res = '';
                    this.nickname.negative_res = '이미 사용중인 닉네임입니다.';
                  } else {
                    this.nickname.negative_res = '';
                    this.nickname.positive_res = '사용할 수 있는 닉네임 입니다.';
                    this.nickname.isOk = true;
                  }
                })
                .catch(() => {
                  this.$swal.fire('', '올바르지 않은 요청입니다.', 'warning');
                })
          }
        }
      }
    }
  },
  methods: {
    // 사진 업로드 버튼을 클릭하면 숨겨진 input 태그를 클릭하게됨
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.image.imgFile = event.target.files[0];

      // file reader 생성, 사용자가 선택한 파일 읽기
      const reader = new FileReader();
      reader.onload = (e) => {
        // 파일을 읽은 후, 읽은 결과를 imgPreview에 저장
        this.image.imgPreview = e.target.result;
      };
      reader.readAsDataURL(this.image.imgFile);
    },
    submitSingUP() {
      const oi = JSON.parse(localStorage.getItem("oi"))
      if(this.nickname.isOk) {
        if(oi != null) {
          const formData = new FormData();
          formData.append('nickname', this.nickname.inputBox);
          formData.append('withOauth', oi.type);
          formData.append('oauthId', oi.data);
          formData.append('image', this.image.imgFile);

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

          this.$axiosWithoutValidation.post("auth/singUpWithOauth", formData, config)
              .then(response => { // 가입완료
                localStorage.removeItem("oi")
                this.$router.push({path: '/singUp/success'});
              })
              .catch(error => {
                this.$swal.fire('', '5MB이하인 이미지만 사용할 수 있습니다.', 'warning');
              })
        } else {
          this.$swal.fire('', '올바르지 않은 요청입니다.', 'warning');
        }
      } else {
        this.$swal.fire('', '사용할 수 있는 닉네임을 입력해주세요.',);
      }
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
  background-color: rgba(246, 246, 246, 0.43);
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