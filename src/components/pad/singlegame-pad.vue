<template>
  <div class="pad-container">
    <div class="input-box mb-3">
      <div class="input-text TheJamsil700">{{inputText}}</div>
    </div>
    <div class="num-pad-container">
      <div class="pad-row" v-for="(row, index) in numberRows" :key="index">
        <div
            v-for="num in row"
            :key="num"
            class="pad-button number-btn"
            :class="{ 'btn-disabled' : isDisabled(num) || allDisable}"
            @click="addNumber(num)">{{ num }}</div>
      </div>
      <div class="pad-row">
        <div class="pad-button" :class="{ 'btn-disabled' : allDisable}" @click="clearNumber">지우기</div>
        <div class="pad-button commit-button redWine-background" :class="{ 'btn-disabled' : allDisable}" @click="submit">입력하기</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputText: "",
      disableNumbers: [],
      numberRows: [
        Array.from({length: 5}, (v, k) => k),
        Array.from({length: 5}, (v, k) => k + 5)
      ],
    }
  },
  props: ['allDisable'],
  watch: {},
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    this.$emit('mounted');
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    addNumber(num) {
      if(!this.allDisable && !this.disableNumbers.includes(num) && this.inputText.length < 4) {
        this.inputText += num;
        this.disableNumbers.push(num);
      }
      if(this.inputText.length === 4) {
        this.disableAllNumbers();
      }
    },
    clearNumber(){
      this.inputText = "";
      this.disableNumbers = [];
    },
    isDisabled(num) {
      return this.disableNumbers.includes(num);
    },
    disableAllNumbers() {
      for(let row of this.numberRows) {
        for(let num of row) {
          if(!this.disableNumbers.includes(num)) {
            this.disableNumbers.push(num);
          }
        }
      }
    },
    submit(){
      if(this.inputText.length === 4) {
        this.$emit('submitNumber', this.inputText)
        this.inputText = '';
        this.disableNumbers = [];
      }
    },
    handleKeydown(event){ /*키보드 컨트롤*/
      // 숫자를 눌렀을때
      if (event.key >= 0 && event.key <=9) {
        const num = Number(event.key)
        if(!this.allDisable && !this.disableNumbers.includes(num) && this.inputText.length < 4) {
          this.addNumber(num);
        }
      }
      // 엔터키를 눌렀을때
      else if(event.key === 'Enter') {
        if (!this.allDisable) {
          this.submit();
        }
      }
      // 백스페이스 또는 딜리트
      else if (event.key === 'Backspace' || event.key === 'Delete') {
        if (!this.allDisable) {
          this.clearNumber();
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
/*패드 전체*/
.pad-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  z-index: 1;
}

/*숫자입력패드*/
.num-pad-container {
}

.pad-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px; // 원하는 높이 설정
  margin-bottom: 10px;
}

.pad-button {
  flex: 1;
  text-align: center;
  line-height: 80px; // pad-row의 높이와 같게 설정
  font-size: 20px; // 원하는 폰트 크기 설정
  border: 1.5px solid #ddd; // 원하는 경계선 스타일 설정
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
  user-select: none;
}

.commit-button {
  color: white; // 원하는 텍스트 색상 설정
}

.pad-button:hover {
  background-color: #e3e3e3; // 원하는 배경색 설정
}

.commit-button:hover {
  background-color: #792031;
}

.pad-button:first-child {
  margin-left: 5px;
}

/*숫자패드 입력안되는 상태로 변경*/
.btn-disabled {
  background-color: #f6f6f6; // 원하는 배경색 설정
  color: #c0c0c0;
  cursor: auto;
}

.btn-disabled:hover {
  background-color: #f6f6f6 !important; // 원하는 배경색 설정
}

/*숫자 입력되는 박스*/
.input-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 70px;
  border: 2px solid #ddd;
  border-radius: 30px;
  text-align: center;
  margin: auto;
}

.input-text {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .pad-row {
    height: 50px; // 원하는 높이 설정
    margin-bottom: 5px;
  }

  .pad-button {
    line-height: 50px; // pad-row의 높이와 같게 설정
    border-radius: 10px;
    margin-right: 5px;
  }

  .input-box {
    border-radius: 20px;
    width: 70vw;
    height: 50px;
  }
  .input-text {
    font-size: 1.2rem;
  }

}
</style>