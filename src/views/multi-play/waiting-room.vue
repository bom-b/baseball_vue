<template>
  <div>
    <div id="makeRoom" class="responsive-container" style="">
      <button id="submit-btn" class="btn-signature" @click="makeRoom">방만들기</button>
    </div>
    <hr>
    <div id="waitingRoom" class="responsive-container" style="">
      <p id="list-title" class="TheJamsil400" style="margin-bottom: 5px;">대기실 목록</p>
      <div class="searchBox">
        <i class="fas fa-search"></i>
        <input id="search" class="" placeholder="방이름 검색">
      </div>
      <div id="rooms-bg" class="mt-4" :style="{ 'height': tableHeight + 'px'}">
        <div class="room">
          <p style="margin-bottom: 0;">한판하실분</p>
          <div class="radius-gray">1분</div>
        </div>
        <div class="room">
          <p style="margin-bottom: 0;">한판하실분</p>
          <div class="radius-gray">1분</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeight: 0, // 동적으로 바뀌는 대기방 테이블 높이
    }
  },
  mounted() {
    // 경기 기록 테이블 높이 설정
    this.$nextTick(() => {
      window.addEventListener('resize', this.calculateTableHeight);
      this.calculateTableHeight();
    });
  },
  beforeDestroy() {
    //테이블 높이 설정
    window.removeEventListener('resize', this.calculateTableHeight);
  },
  methods: {
    calculateTableHeight() { /*테이블 높이 구하기*/
      let windowHeight = window.innerHeight; //윈도우 높이
      let roomsBgElement = document.getElementById('rooms-bg'); // #rooms-bg 요소 가져오기
      let topDistance = roomsBgElement.getBoundingClientRect().top; // 화면의 맨 위에서 #rooms-bg 까지의 거리
      this.tableHeight = windowHeight - topDistance - 50; // 좀만 더 빼주기
    },
    checkLogin() {
      return !!window.localStorage.getItem('jwtToken');
    },
    makeRoom() {
      let isLogin = this.checkLogin();
      if(isLogin) {
        this.$router.push({path: '/ready/makeRoom'});
      } else {
        this.$swal.fire("","로그인이 필요합니다.");
      }
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
}

#list-title {
  font-size: 2rem;
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

.searchBox {
  outline: none; /* 기본 아웃라인 제거 */
  display: flex;
  align-items: center;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #8a2b3e; /* 테두리 색상 변경 */
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.searchBox:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(138, 43, 62, 0.25) ; /* #8a2b3e 색상의 네온사인 효과 */
}

#search {
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
}

.fas.fa-search {
  color: #8a2b3e;
  margin-right: 7px;
}

#rooms-bg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 10px;
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
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 40px;
  border-radius: 15px;
  border: 1px solid #e3e0e0;
  width: 100%;
  min-height: 60px;
  background-color: white;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow .15s ease-in-out;;
  cursor: pointer;
}

.room:hover {
  background-color: #f8f8f8;
  color: #8a2b3e;
  box-shadow: 0 0 0 0.2rem rgba(138, 43, 62, 0.1) ; /* #8a2b3e 색상의 네온사인 효과 */
}

@media (max-width: 768px) {
  .responsive-container {
    padding: 10px 20px;
  }

  #rooms-bg {
    width: 90vw;
  }

  #list-title {
    font-size: 1rem;
  }

  .room {
    padding: 0 10px 0 20px;
    min-height: 50px;
    margin-bottom: 5px;
  }
}
</style>