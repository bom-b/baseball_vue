<template>
  <div @click="hideModal">

    <div v-show="modal.showModal" class="modal-overlay">

      <div v-show="modal.isProgressModal" class="progress-modal">
        <div>
          <p class="modal-title TheJamsil400" v-html="modal.title"></p>
          <p class="modal-text mt-5" v-html="modal.text"></p>
        </div>
        <progress :value="modal.progress" :max="modal.progressMax" id="progressBar"></progress>
      </div>

      <!--   결과   -->
      <div v-show="modal.isResultModal" class="result-modal">
        <div>
          <p class="result-title TheJamsil400 animate__animated animate__fadeIn">
            <span v-if="game.strike === 4" style="color: green; font-weight: bold;">HOMRUN!</span>
            <span v-else-if="game.strike === 0 && game.ball === 0" style="color: darkred; font-weight: bold;">OUT</span>
            <template v-else>
              <span>{{ game.strike }}</span>
              <span style="color: orange; font-weight: bold;">S </span>
              <span>{{ game.ball }}</span>
              <span style="color: green; font-weight: bold;">B</span>
            </template>
          </p>
          <p class="modal-text mt-3">{{ modal.text }}</p>
        </div>
      </div>

    </div>

    <div class="table-box">
      <table id="historyTable" class="table">
        <thead ref="tableHead" class="table-light">
        <tr>
          <th class="table-title">
            <span v-if="player.id" style="color:#626262;">
              <img id="thumbnail" :src="player.profileImgUrl">
              {{player.nickname}}님
            </span>
            <span v-else style="color:gray;">UNKOWN PLAYER </span>
            <span> ({{ game.numberHistory.length }}회차)</span>
          </th>
        </tr>
        </thead>
        <tbody id="historyTable-body" ref="historyTableBody" :style="{ 'max-height': tableHeight + 'px'}">
        <tr v-if="game.numberHistory.length === 0">
          <td class="table-content">
            <span style="color: gray;">4자리 숫자를 입력해주세요.</span>
          </td>
        </tr>
        <tr v-else v-for="(item, index) in game.numberHistory" :key="index">
          <td class="table-content">
            <span>{{ item }}</span>
            <span id="arrow"> 👉 </span>
            <span v-if="game.strikeHistory[index] === 4" style="color: green; font-weight: bold;">HOMRUN!</span>
            <span v-else-if="game.strikeHistory[index] === 0 && game.ballHistory[index] === 0"
                  style="color: darkred; font-weight: bold;">OUT</span>
            <template v-else>
              <span>{{ game.strikeHistory[index] }}</span><span style="color: orange; font-weight: bold;">S </span>
              <span>{{ game.ballHistory[index] }}</span><span style="color: green; font-weight: bold;">B</span>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <pad ref="pad" @mounted="calculateTableHeight" @submitNumber="submitNumber" :all-disable="allDisable"/>
</template>
<script>
import pad from '@/components/pad/singlegame-pad.vue';

export default {
  components: {
    pad
  },
  data() {
    return {
      isGameEnded: false, // true = 게임 끝
      allDisable: false, // true = 모든 버튼 조작 불가
      tableHeight: 0, // 동적으로 바뀌는 기록 테이블 높이
      player: {
        id: '',
        nickname: '',
        profileImgUrl: '',
      },
      modal: {
        showModal: true,
        isProgressModal: false,
        isResultModal: false,

        title: "",
        text: "",
        progress: 0,
        progressMax: 0,
        interval: null,
      },
      game: {
        cpuNumber: 0,
        usersNumber: 0,
        numberHistory: [],
        strikeHistory: [],
        ballHistory: [],

        strike: 0,
        ball: 0,
      }
    }
  },
  watch: {
    /*모달창이 뜰때마다 버튼 못누르게 만들기, 꺼지면 버튼 활성화*/
    'modal.showModal': function (newValue) {
      if (!this.isGameEnded) {
        this.allDisable = newValue === true;
      }
    }
  },
  mounted() {
    // 로컬스토리지에 토큰이 있다면 유저 정보 가져오기
    if(window.localStorage.getItem("jwtToken")) {
      this.getUserInfo();
    }

    // 경기 기록 테이블 높이 설정
    this.$nextTick(() => {
      window.addEventListener('resize', this.calculateTableHeight);
    });

    this.allDisable = true;
    this.game.cpuNumber = this.generateFourDigits();
    this.modal.title = "숫자를 골랐어요!";
    if(window.localStorage.getItem("jwtToken")) {
      this.modal.text = "제가 생각한 숫자를 맞춰보세요😊";
    } else {
      this.modal.text = "제가 생각한 숫자를 맞춰보세요😊<br/>게임을 기록하시려면 로그인 해주세요.";
    }
    this.modal.progressMax = 40;
    this.showProgressModal();
  },
  beforeDestroy() {
    //테이블 높이 설정
    window.removeEventListener('resize', this.calculateTableHeight);
  },
  methods: {
    calculateTableHeight() { /*테이블 높이 구하기*/
      let windowHeight = window.innerHeight; //윈도우 높이
      let padHeight = this.$refs.pad.$el.offsetHeight; // 입력패드의 높이
      let theadHeight = this.$refs.tableHead.offsetHeight; // 테이블 헤드의 높이
      let theadTop = Math.ceil(this.$refs.tableHead.getBoundingClientRect().top + window.pageYOffset); // 문서의 맨 위에서 테이블 헤드까지의 절대거리
      this.tableHeight = windowHeight - padHeight - theadHeight - theadTop - 70; // 고정헤더의 길이도 뺄것
    },
    showProgressModal() {
      this.modal.showModal = true;
      this.modal.isProgressModal = true;
      this.modal.interval = setInterval(() => {
        this.modal.progress += 1;
        if (this.modal.progress === this.modal.progressMax) {
          clearInterval(this.modal.interval);
          this.modal.showModal = false;
          this.modal.isProgressModal = false;
          this.allDisable = false;
          this.modal.progress = 0;
        }
      }, 100);
    },
    showFinallyModal() {
      this.modal.showModal = true;
      this.modal.isProgressModal = true;
      this.modal.interval = setInterval(() => {
        this.modal.progress += 1;
        if (this.modal.progress === this.modal.progressMax) {
          clearInterval(this.modal.interval);
          this.$router.push('/'); // 홈으로 이동
        }
      }, 100);
    },
    showResultModal() {
      // 스트라이크 4개 > 게임끝
      if (this.game.strike === 4) {
        this.isGameEnded = true; // 게임 끝
        this.allDisable = true; // 버튼 조작 금지
        this.modal.showModal = true;
        this.modal.isResultModal = true;
        if(this.player.id) { // 로그인 되어있을 경우 경기 기록
          this.recordResult();
        }

        setTimeout(() => {
          this.modal.showModal = false;
          this.modal.isResultModal = false;
          this.modal.title = "제가 생각한 숫자를 <br/>맞추셨어요🎉";
          if(this.player.id) {
            this.modal.text = this.game.numberHistory.length + "번만에 맞추신걸 기록해드릴게요!<br/>잠시 후, 홈으로 이동합니다";
          } else {
            this.modal.text = this.game.numberHistory.length + "번만에 맞추셨어요!<br/>기록하시려면 로그인이 필요해요.";
          }
          this.modal.progressMax = 60;
          this.showFinallyModal()
        }, 3000);

      } else {
        this.modal.showModal = true;
        this.modal.isResultModal = true;
        setTimeout(() => {
          this.modal.showModal = false;
          this.modal.isResultModal = false;
        }, 2200);
      }
    },
    hideModal() {
      this.modal.showModal = false;
      this.modal.isResultModal = false;
      this.modal.isProgressModal = false;
    },
    generateFourDigits() {
      let digits = [];
      while (digits.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!digits.includes(num)) {
          digits.push(num);
        }
      }
      return digits.join('');
    },
    submitNumber(usersNumber) {
      this.game.usersNumber = usersNumber;
      const {strike, ball} = this.calculateStrikeAndBall(usersNumber);
      this.game.strike = strike;
      this.game.ball = ball;
      this.game.numberHistory.push(usersNumber);
      this.game.strikeHistory.push(strike);
      this.game.ballHistory.push(ball);

      // 스크롤바 아래로 내리기
      this.$nextTick(() => {
        const tableBody = this.$refs.historyTableBody;
        tableBody.scrollTop = tableBody.scrollHeight;
      });

      this.modal.text = usersNumber;
      this.showResultModal();
    },
    calculateStrikeAndBall(usersNumber) {
      let strike = 0;
      let ball = 0;

      for (let i = 0; i < usersNumber.length; i++) {
        if (this.game.cpuNumber.includes(usersNumber[i])) {
          if (this.game.cpuNumber[i] === usersNumber[i]) {
            strike += 1;
          } else {
            ball += 1;
          }
        }
      }

      return {strike, ball};
    },
    getUserInfo() {
      this.$axiosWithoutValidation.get("/auth/checkToken")
          .then((response) => {
            this.player.id = response.data.id;
            this.player.nickname = response.data.nickname;
            this.player.profileImgUrl = this.$s3BaseURL + "/user/profileImg/" + response.data.profileImg;
          })
    },
    recordResult() {
      this.$axios.post("singleGame/record", this.game.numberHistory.length)
          .then(result => {
          })
          .catch(error => {
            this.$swal.fire("", "기록에 실패하였습니다.")
          })
    }
  }
}
</script>
<style scoped lang="scss">
* {
  user-select: none;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.progress-modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  pointer-events: auto;
  transition: transform 0.5s ease;

  .modal-title {
    font-size: 1.5rem;
  }

}

.result-modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: auto;
  transition: transform 0.5s ease;

  .result-title {
    font-size: 2.5rem;
  }
}

progress {
  width: 100%;
  height: 20px;
  transition: all 0.3s ease;
}

/*히스토리테이블*/
.table-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
}

#historyTable {
  width: 600px;
  text-align: center;
  //border: 2px solid  #ddd;
  border-collapse: separate;
  border-spacing: 0;

  thead tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }

  thead {
    height: 80px;
  }

  td, th {
    vertical-align: middle;
  }

  tr, td {
    width: 600px;
  }

  td {
    padding: 20px;
  }

  .table-title {
    font-size: 2rem;
  }

  .table-content {
    font-size: 1.5rem;
  }

  #historyTable-body {
    display: block;
    overflow: auto;
  }

  /*스크롤바 없애기*/
  #historyTable-body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  #historyTable-body {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  #arrow {
    margin: 0 50px;
    opacity: 0.3;
  }
}

#thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover; /* 이미지 비율 유지하면서 요소 채우기 */
  margin-right: 5px;
}

@media (max-width: 768px) {
  #historyTable {
    width: 70vw;

    thead {
      height: 50px;
    }

    .table-title {
      font-size: 1rem;
    }

    .table-content {
      font-size: 1rem;
    }

    tr, td {
      width: 70vw;
    }

    td {
      padding: 8px;
    }

    #arrow {
      margin: 0 30px;
    }
  }

  #thumbnail {
    width: 25px;
    height: 25px;
  }
}
</style>