<template>
  <div>
    <div id="makeRoom" class="responsive-container" style="">
      <router-link to="/ready/waitingRoom">
        <button id="submit-btn" class="btn-gray">대기실 돌아가기</button>
      </router-link>
    </div>
    <hr>
    <div id="waitingRoom" class="responsive-container" style="">
      <p id="makeRoom-title" class="TheJamsil400" style="margin-bottom: 0">방만들기</p>
      <div>
        <div id="rooms-bg" class="mt-4">
          <div class="room mt-2">
            <p class="list-title TheJamsil400">방이름</p>
            <input v-model="room.name" class="form-control">
            <p v-if="negative_res" class="mt-2" style="color: darkred; font-size: 0.8em;">{{
                negative_res
              }}</p>
          </div>
          <div class="room mt-4">
            <p class="list-title TheJamsil400">한턴당 시간제한</p>
            <div id="times">
              <div
                  class="radius-gray"
                  :class="{ active: room.time === 60 }"
                  @click="selectTime(60)"
              >
                1분
              </div>
              <div
                  class="radius-gray"
                  :class="{ active: room.time === 180 }"
                  @click="selectTime(180)"
              >
                3분
              </div>
              <div
                  class="radius-gray"
                  :class="{ active: room.time === 300 }"
                  @click="selectTime(300)"
              >
                5분
              </div>
            </div>
          </div>
        </div>
        <div
            style="display: flex; flex-direction: column; justify-content:flex-end; align-items: flex-end; padding: 20px 0px 30px 0px;">
          <button id="submit-btn" class="btn-signature" @click.capture="makeRoom">생성하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameIsOk: false,
      negative_res: '',
      room: {
        name: '',
        time: 180,
      }
    }
  },
  mounted() {
    // 페이지 로딩 시 로그인 체크
    if (!window.localStorage.getItem('jwtToken')) {
      this.$swal.fire("", "로그인이 필요합니다.").then(() => {
        this.$router.push('/ready/waitingRoom');
      });
    }
  },
  watch: {
    'room.name'(newValue) {
      if (newValue.length > 20) {
        this.nameIsOk = false;
        this.negative_res = '방 이름이 너무 깁니다.'
      } else if (newValue.length > 0 && newValue.length < 21) {
        this.nameIsOk = true;
        this.negative_res = ''
      }
    }
  },
  methods: {
    selectTime(time) {
      this.room.time = time;
    },
    makeRoom() {

      if (!this.nameIsOk) {
        this.$swal.fire("", "유효한 방이름을 입력해주세요.");
        return;
      }

      if (window.localStorage.getItem("mStatus") != null) { // 이미 만든 방이 있거나 게임중 상태라면
        this.$swal.fire("", "유효하지 않은 접근입니다.");
        return;
      }

      const data = {
        name: this.room.name,
        time: this.room.time
      }

      this.$axios.post("/room/makeRoom", data)
          .then(response => {
            const multiStatus = {
              'roomId': response.data, // 응답으로부터 받은 생성된 방번호
              'head': true, // 방장이면 true
              'isStart': false, // 게임 시작했으면 true
            }
            // window.localStorage.setItem("mStatus", JSON.stringify(multiStatus));
            this.$router.push("/ready/waitingRoom");
          })
          .catch(error => {

          })

    }
  }
}
</script>
<style scoped>
.btn-signature {
  padding: 10px 10px;
}

.radius-gray {
  background-color: rgba(218, 218, 218, 0.37);
  color: #484848;
  border: none;
  border-radius: 20px;
  padding: 5px 20px;
  min-width: 20px;
  min-height: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.radius-gray:hover {
  background-color: #dedede;
  color: #8a2b3e;
}

.active {
  background-color: #dedede;
  color: #8a2b3e;
  box-shadow: 0 0 0 0.2rem rgba(138, 43, 62, 0.25); /* #8a2b3e 색상의 네온사인 효과 */
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

#makeRoom-title {
  font-size: 2rem;
}

.list-title {
  font-size: 1.2rem;
}

hr {
  border: none;
  border-top: 1px solid #8a2b3e; /*선 색상 설정 */
  margin-top: 0;
  margin-bottom: 20px;
}

.responsive-container {
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
}

#makeRoom {
  align-items: flex-end;
}

#waitingRoom {
  align-items: flex-start;
}

.form-control {
  width: 400px;
}

#rooms-bg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 10px 40px 10px;
  border-radius: 15px;
  width: 700px;
  background-color: rgb(246, 246, 246);
  overflow: auto;
}

/*스크롤바 없애기*/
#rooms-bg::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.room {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px 0 40px;
  width: 100%;
  min-height: 60px;
  margin-bottom: 10px;
}

#times {
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .responsive-container {
    padding: 10px 20px;
  }

  #rooms-bg {
    width: 90vw;
  }

  .list-title {
    font-size: 1rem;
  }

  #makeRoom-title {
    font-size: 1.5rem;
  }

  .room {
    padding: 0 10px 0 10px;
    min-height: 50px;
    margin-bottom: 5px;
  }

  .form-control {
    width: 100%;
  }
}
</style>