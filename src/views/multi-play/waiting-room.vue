<template>
  <div>
    <div id="header" class="responsive-container" style="">
      <div v-if="myStatus.isInRoom" id="room-status-container">
        <div id="room-status">
          <div v-if="myStatus.isHead" class="room-status-content">
            <div class="mb-3" style="display: flex; flex-direction: row; align-items: center;">
              <span class="loading-icon"></span>
              <p style="color: white; margin-bottom: 0;">참가를 기다리는 중입니다...</p>
            </div>
            <p id="room-status-content-roomName" class="TheJamsil400" style="color: white">{{ myRoom.roomName }}</p>
            <div class="mt-3"
                 style="display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
              <button id="submit-btn" class="btn-gray" @click="destroyRoom">취소</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="submit-btn-container">
        <button id="submit-btn" class="btn-signature" @click="makeRoom">방만들기</button>
      </div>
    </div>

    <hr>
    <div id="waitingRoom" class="responsive-container" style="">
      <p id="list-title" class="TheJamsil400" style="margin-bottom: 5px;">대기실 목록</p>
      <div id="search-and-refresh">
        <div class="searchBox">
          <i class="fas fa-search"></i>
          <input v-model="searchVal" id="search" class="" placeholder="방이름 검색">
        </div>
        <div class="refreshBtn" @click="getRoomList">
          <i class="fas fa-sync"></i>
        </div>
      </div>
      <div id="rooms-bg" class="mt-4" :style="{ 'height': tableHeight + 'px'}">
        <div v-if="rooms.length === 0" class="mt-4" style="display: flex; justify-content: center; width: 100%;">
          <p>{{ roomMsg }}</p>
        </div>
        <div v-else class="room" @click="enterRoom(room.room_id, room.room_name)"
             v-for="(room, index) in filteredRooms" :key="index"
        >
          <p class="room-title">{{ room.room_name }}</p>
          <div class="radius-gray">{{ room.time / 60 }}분</div>
        </div>
        <div v-if="rooms.length !== 0 && filteredRooms.length === 0" class="mt-4" style="display: flex; justify-content: center; width: 100%;">
          <p>검색 결과가 없습니다.</p>
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
      rooms: [],
      roomMsg: '',
      searchVal: '',
      myStatus: {
        isInRoom: false,
        isStart: false,
        isHead: false,
      },
      myRoom: {
        roomId: '',
        roomName: '',
      }
    }
  },
  computed: {
    filteredRooms() {
      if(this.searchVal === '') {
        return this.rooms;
      } else {
        return this.rooms.filter(room => room.room_name.includes(this.searchVal));
      }
    }
  },
  mounted() {
    this.getRoomList().then(() => { // 방 목록 가져오기
      this.checkIsInRoom().then(() => { // 방에 들어가 있는가, 방에 들어가 있다면 방의 이름을 구한다.
        this.calculateTableHeight(); // 경기 기록 테이블 높이 설정
        window.addEventListener('resize', this.calculateTableHeight);
      });
    })
  },
  watch: {
    'myStatus.isInRoom'() {
      this.$nextTick(() => {
        this.calculateTableHeight();
      });
    }
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
      if (isLogin) {
        this.$router.push({path: '/ready/makeRoom'});
      } else {
        this.$swal.fire("", "로그인이 필요합니다.");
      }
    },
    getRoomList() {
      this.rooms = [];
      this.roomMsg = '';
      return this.$axios.get("/room/getRoomList")
          .then((response) => {
            this.rooms = response.data;
            this.roomMsg = '방이 존재하지 않습니다. 방을 만들어보세요.';
          })
          .catch((error) => {
            this.roomMsg = '서버와의 통신이 원할하지 않습니다.';
          });
    },
    checkIsInRoom() {
      return this.$axios.get("/room/getUsersRoomInfo")
          .then((response) => {
            const data = response.data;
            if (data.room_id) { // 만약 내가 속한 방이 있다면,
              this.myStatus.isInRoom = true;
              this.myStatus.isHead = data.player1 === data.head
              this.myStatus.isStart = data.status === '1';
              this.myRoom.roomId = data.room_id;
              this.myRoom.roomName = data.room_name;
            }
          })
          .catch((error) => {

          })
    },
    destroyRoom() {
      this.$axios.post("/room/destroyRoom", this.myRoom.roomId)
          .then((response) => {
            this.getRoomList();
            this.myStatus.isInRoom = false;
            this.myStatus.isHead = false;
            this.myStatus.isStart = false;
            this.myRoom.roomId = '';
            this.myRoom.roomName = '';
          })
          .catch((error) => {
            this.$swal.fire('', '잠시 후 다시 시도해주세요.', 'warning');
          })
    },
  }
}
</script>
<style scoped>
.loading-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 1rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.btn-signature {
  padding: 10px 10px;
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

#room-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 210px;
  width: 800px;
}

.room-status-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1.5rem 0;
}

#room-status-content-roomName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2rem;
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

#header {
  align-items: center;
}

#submit-btn-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 40px;
  width: 1000px;
}

#room-status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #007BFF;
  padding: 0 40px;
  width: 1000px;
}

#waitingRoom {
  align-items: flex-start;
}

#search-and-refresh {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.refreshBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .50rem;
  width: 40px;
  height: 40px;
  background-color: #8a2b3e;
  margin-left: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.refreshBtn:hover {
  background-color: #771f31;
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
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.searchBox:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(138, 43, 62, 0.25); /* #8a2b3e 색상의 네온사인 효과 */
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

.fas.fa-sync {
  color: white;
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
  box-shadow: 0 0 0 0.2rem rgba(138, 43, 62, 0.1); /* #8a2b3e 색상의 네온사인 효과 */
}

.room-title {
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
}

@media (max-width: 768px) {
  .responsive-container {
    padding: 10px 20px;
  }

  #submit-btn-container {
    padding: 0 20px;
    width: 100vw;
  }

  #room-status {
    width: 90vw;
  }

  #room-status-container {
    padding: 0 20px;
    width: 100vw;
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

  .room-title {
    width: 50vw;
  }

  #room-status-content-roomName {
    width: 70vw;
  }
}
</style>