const app = getApp()
var minA = 1,
  maxA = 99;
var minB = 1,
  maxB = 99;
var minA_ = 1,
  maxA_ = 99,
  maxA__ = 9;
var minB_ = 1,
  maxB_ = 9;
var A = 0;
var B = 0;
var proText = "";
var op = "+";
var ans = 0;
var myAnsValue = -1;
var longTap = false;
Page({
  data: {
    mproText: '准备!',
    mop: "+",
    isRight: false,
    inputFocus: false,
    infoTxt: '',
    inputEnable: true,
    inputValue: '',
    btn0: '0',
    btn1: '1',
    btn2: '2',
    btn3: '3',
    btn4: '4',
    btn5: '5',
    btn6: '6',
    btn7: '7',
    btn8: '8',
    btn9: '9',
    proAuto: false,
    mycoins: 0,
    touch_start: null,
    touch_end: null
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  sltPlus: function () {
    op = "+";
    this.setData({ mop: op });
    this.showPro();
  }
  ,
  sltSubd: function () {
    op = "-";
    this.setData({ mop: op });
    this.showPro();
  }
  ,
  sltMult: function () {
    op = "×";
    this.setData({ mop: op });
    this.showPro();
  },
  sltDivi: function () {
    op = "÷";
    this.setData({ mop: op });
    this.showPro();
  },
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
        break;
      default:
        return 0;
        break;
    }
  },
  showPro: function () {
    if (op === "+") {
      A = this.randomNum(minA, maxA);
      maxB = 100 - A;
      B = this.randomNum(minB, maxB);
    } else if (op === "-") {
      A = this.randomNum(minA, maxA);
      maxB = 100 - A;
      B = this.randomNum(minB, maxB);

      A = A + B;
    }
    else if (op === "×") {
      A = this.randomNum(minA_, maxA_);
      B = this.randomNum(minB_, maxB_);
    }
    else if (op === "÷") {
      A = this.randomNum(minA_, maxA__);
      B = this.randomNum(minB_, maxB_);

      A = A * B;
    }
    proText = A + op + B + "=?";
    this.setData({ mproText: proText });
    this.setData({ inputEnable: false });
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  },
  showAns: function () {
    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
    proText = A + op + B + "=" + ans;

    this.setData({ mproText: proText });
  },
  bindKeyInput: function (e) {
    myAnsValue = e.detail.value;
  },
  ansSubmit: function () {
    this.checkInput();
  },
  focusInputEvent: function (e) {
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  },
  checkInput: function () {
    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
  },
  AnsInput: function (e) {
    myAnsValue = this.data.inputValue;
    myAnsValue += e.target.id;
    this.setData({ inputValue: myAnsValue });
  },
  AnsClear: function () {
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  },
  switchChange: function (e) {
    this.setData({ proAuto: e.detail.value });
    this.showPro();
  },
  checkInput: function () {
    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
    if (myAnsValue.length === undefined) {
      this.setData({ infoTxt: '' });
    } else if (parseInt(myAnsValue) === parseInt(ans)) {
      this.setData({ isRight: true });
      this.setData({ infoTxt: '✔' });
      wx.showToast({
        title: '伊夏宝宝真聪明',
        icon: 'success',
        duration: 1000
      })
      this.showPro();
    }
    else {
      this.setData({ isRight: false });
      this.setData({ infoTxt: '✘' });
      wx.showToast({
        title: '伊夏是个小笨猪',
        icon: 'loading',
        duration: 1000
      })
    }
  },
})
