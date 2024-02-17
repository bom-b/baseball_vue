<template>
  <div id="box">
    <div id="title-box">
      <p id="title" class="TheJamsil400">프로필 수정</p>
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
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;">
            <a id="changeDefaultImg" @click="changeDefaultImg">기본 이미지로 변경</a>
            <button class="btn-gray mt-3" @click="triggerFileInput">사진 업로드</button>
          </div>
        </div>
      </div>
    </div>
    <p style="text-align: center; color: gray; font-size: 0.8em; margin-top: 5px; margin-bottom: 0;">부적절한 데이터 추가시 <br/>예고없이 계정이 삭제될 수 있습니다.</p>
    <div style="display: flex; flex-direction: column; padding-bottom: 30px;">
      <button id="submit-btn" class="btn-signature" @click.capture="submitUpdate">수정하기</button>
      <button id="" class="btn-gray mt-3" @click.capture="submitWithdrawal">탈퇴하기</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      nickname: {
        origin: '',
        inputBox: '',
        isOk: false,
        positive_res: '',
        negative_res: '',
      },
      image: {
        imgFile: null,
        imgChangeDefault: false,
        imgPreview: '',
      }
    }
  },
  watch: {
    'nickname.inputBox'(newValue) {
      // 초기화
      this.nickname.isOk = false;
      this.nickname.negative_res = '';

      if (newValue.length === 0) {
        this.nickname.positive_res = '';
      }

      // 기존 닉네임이랑 같다면 Ok
      if (newValue === this.nickname.origin) {
        this.nickname.negative_res = '';
        this.nickname.positive_res = '사용할 수 있는 닉네임 입니다.';
        this.nickname.isOk = true;
      } else {
        // 한글, 영어, 숫자, 특수문자(-) 이외의 문자가 있는지 확인
        if (newValue.length > 0) {
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
    }
  },
  mounted() {
    this.getUserInfo();
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
      this.image.imgChangeDefault = false;
    },
    submitUpdate() {
      if (this.nickname.isOk) {

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        const formData = new FormData();
        formData.append('nickname', this.nickname.inputBox);
        formData.append('image', this.image.imgFile);
        formData.append('imgChangeDefault', this.image.imgChangeDefault);

        this.$axios.post("member/UpdateProfile", formData, config)
            .then(response => { // 수정완료
              this.$router.push({path: '/user/info'});
            })
            .catch(error => {
              this.$swal.fire('', '잠시 후 다시 시도해주세요.', 'warning');
              this.$router.push({path: '/user/update'});
            })

      } else {
        this.$swal.fire('', '사용할 수 있는 닉네임을 입력해주세요.');
      }
    },
    submitWithdrawal() {
      this.$swal.fire({
        title: '정말 탈퇴하시겠습니까?',
        text: '데이터는 복구할 수 없습니다.',
        icon: 'warning',
        showCancelButton: true})
          .then((result) => {
            if (result.isConfirmed) {
              // 카카오 정보제공 철회
              const accessToken = JSON.parse(window.localStorage.getItem("user")).ac;
              const url = 'https://kapi.kakao.com/v1/user/unlink';

              fetch(url, {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + accessToken,
                  'Content-type': 'application/x-www-form-urlencoded'
                }

              }).then(() => {
                // 카카오 정보제공 철회 완료 후 DB삭제
                this.$axios.get("member/withdrawal")
                    .then(response => { // 탈퇴완료
                      this.$swal.fire('', '탈퇴처리 되었습니다.', 'success');
                      window.localStorage.removeItem('jwtToken');
                      window.localStorage.removeItem('user');
                      this.$router.push({path: '/'});
                    })
                    .catch(error => {
                      this.$swal.fire('', '잠시 후 다시 시도해주세요.', 'warning');
                      this.$router.push({path: '/user/update'});
                    })

              }).catch(() => {
                this.$swal.fire('', '잠시 후 다시 시도해주세요.', 'warning');
                this.$router.push({path: '/user/update'});
              });
            }
          })
    },
    getUserInfo() {
      this.$axios.get('/member/getProfileInfo')
          // 토큰을 통해 사용자의 정보를 받아오기
          .then((response) => {
            this.id = response.data.id;
            this.nickname.origin = response.data.nickname;
            this.nickname.inputBox = response.data.nickname;
            this.image.imgPreview = this.$s3BaseURL + "/user/profileImg/" + response.data.profileImg;
          })
    },
    changeDefaultImg() {
      this.image.imgChangeDefault = true;
      this.image.imgPreview = this.$s3BaseURL + "/user/profileImg/default";
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

.btn-gray {
  background-color: #e7e7e7;
  color: #8a2b3e;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 20px;
  min-height: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-gray:hover {
  background-color: #dedede;
  color: #8a2b3e;
}

#changeDefaultImg {
  cursor: pointer;
  text-decoration: underline;
  color: darkblue;
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