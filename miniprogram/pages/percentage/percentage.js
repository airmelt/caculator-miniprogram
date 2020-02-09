const result_list = new Array(
  '1/2=50.00%',
  '1/3=33.33%', '2/3=66.67%',
  '1/4=25.00%', '3/4=75.00%',
  '1/5=20.00%', '2/5=40.00%', '3/5=60.00%', '4/5=80.00%',
  '1/6=16.67%', '5/6=83.33%',
  '1/7=14.28%', '2/7=28.57%', '3/7=42.86%', '4/7=57.14%', '5/7=71.43%', '6/7=85.71%',
  '1/8=12.50%', '3/8=37.50%', '5/8=62.50%', '7/8=87.50%',
  '1/9=11.11%', '2/9=22.22%', '4/9=44.44%', '5/9=55.56%', '7/9=77.78%', '8/9=88.89%',
  '1/11=9.09%', '1/12=8.33%', '1/13=7.69%', '1/14=7.14%', '1/15=6.67%', '1/16=6.25%'
  );
var len = result_list.length;
var index = 0;
var percentage = '';
var fraction = '';
var result = new Array();
var proText = '';
var op = "%";
var ans = '';
var myAnsValue = -1;
var longTap = false;
Page({
  data: {
    mproText: '准备!',
    mop: "%",
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
    btn10: '.',
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

  sltPct: function () {
    op = "%";
    this.setData({ mop: op });
    this.setData({ btn10: '.' });
    this.showPro();
  },
  sltDivi: function () {
    op = "÷";
    this.setData({ mop: op });
    this.setData({ btn10: '/' });
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
    index = this.randomNum(len);
    proText = result_list[index];
    result = proText.split('=');
    fraction = result[0];
    percentage = result[1];
    if (op === '%') {
      proText = fraction + '=?%'
    } else if (op === '÷') {
      proText = percentage + '=?';
    }
    this.setData({ mproText: proText });
    this.setData({ inputEnable: false });
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  },
  showAns: function () {
    if (op === '%') {
      proText = fraction + '=' + percentage;
    } else if (op === '÷') {
      proText = percentage + '=' + fraction;
    }
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
    if (op === "%") {
      ans = percentage.split('%')[0];
    } else if (op === "÷") {
      ans = fraction;
    }
    if (myAnsValue.length === undefined) {
      this.setData({ infoTxt: '' });
    } else if (myAnsValue === ans) {
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
 