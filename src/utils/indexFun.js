const utilsFun = {
  /**
   * 判断字符是否为空的方法
   * 返回值为true时代表是空值
   */
  isEmpty: (obj, type = 'String') => {
    if (type === 'Object') {
      if (JSON.stringify(obj) === '{}' || typeof obj == 'undefined' || obj == null) {
        return true; //如果为空，返回false
      }
      return false; //如果不为空，返回true
    }
    if (typeof obj == 'undefined' || obj == null || obj == '') {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 遍历对象，返回PATCH格式
   * @param {*} formData 最新的表单数据
   * @param {*} copyFormData 原先的表单数据
   * @param {*} excludeArr 不需要遍历的字段
   * @returns 需要更新的值
   */
  compareObj: (formData, copyFormData,excludeArr=[]) => {
    const changeData = [];
    for (let key in formData) {
      let oldValue = copyFormData[key];
      let value = formData[key];
      let arr = []
      arr = excludeArr.filter((i) => { return i == key})
      if (oldValue !== value && arr.length == 0) {
        changeData.push({
          op: 'Replace',
          path: key,
          value,
        });
      }
    }
    return changeData;
  },
  // 从url获取参数
  getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    return r ? decodeURI(r[2]) : null;
  },
  // 日期格式化
  dateFormat(date, fmt) {
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
      }
    }
    return fmt;
  },
  /**
   * 遍历树形结构
   * @param {*} value 需要遍历的value值
   * @param {*} data 遍历的数组
   * @returns 数组中符合value值的对象
   */
  ergodicData(value, data, valueName = 'value') {
    for (let i in data) {
      if (data[i][valueName] === value) {
        return data[i];
      }
      if (data[i].children) {
        return this.ergodicData(value, data[i].children, valueName);
      }
    }
  },
  getUserPermissions: () => {
    // http://localhost:9522/#/pathway/pathway/pathway/Tenant/getTenantListInfo
    let WinUrl = window.location.href; //拿到当前路由地址
    let path = WinUrl.slice(WinUrl.indexOf('#') + 2, WinUrl.length);
    path = path.slice(path.indexOf('/') + 1, path.length); //拿到和配置的菜单相同的code
    let menuList = JSON.parse(window.localStorage.getItem('menuList')); //获取缓存的所有菜单
    let parentId = menuList.filter(item => item.code === path)[0].permissionId; //拿到这个菜单的父节点
    let ParentChildren = [];
    if (!utilsFun.isEmpty(parentId)) {
      //遍历菜单下所有的按钮
      ParentChildren = menuList.filter(item => item.parentId == parentId && item.isButton === '3');
    }
    return ParentChildren;
  },
  //格式化动态枚举
  formatEnum(key, value) {
    var enumList = JSON.parse(window.localStorage.getItem('enumList'))[key];
    let arr = enumList.filter(i => i.code === value);
    if (arr.length > 0) {
      return arr[0].name;
    }
    return '';
  },
  //格式化时间
  format(dat) {
    //获取年月日，时间
    var year = dat.getFullYear();
    var mon = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1;
    var data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate();
    var hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours();
    var min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes();
    var seon = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds();
    var newDate = year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon;
    return newDate;
  },
  /**
   * 日期加天数的方法
   * @param {*} dataStr dataStr日期字符串
   * @param {*} dayCount dayCount 要增加的天数
   * @returns 增加n天后的日期字符串
   */
  dateAddDays(dataStr, dayCount) {
    var strdate = dataStr; //日期字符串
    var isdate = new Date(strdate.replace(/-/g, '/')); //把日期字符串转换成日期格式
    isdate = new Date((isdate / 1000 + 86400 * dayCount) * 1000); //日期加1天
    var pdate = isdate.getFullYear() + '-' + (isdate.getMonth() + 1) + '-' + isdate.getDate(); //把日期格式转换成字符串
    return pdate;
  },
  /**
   *
   * @param {*} timestamp 时间戳
   * @returns 字符串转成时间格式
   */
  timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },
  //获取当前登录人信息
  getUserInfo() {
    return JSON.parse(window.localStorage.getItem('userInfo'));
  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = '-';
    var seperator2 = ':';
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    var currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      ' ' +
      date.getHours() +
      seperator2 +
      date.getMinutes() +
      seperator2 +
      date.getSeconds();
    return currentdate;
  },
  //先获取当前时间，在分别吧年月日时分秒取出来加上一个随机数来实现
  getDtId() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ms = d.getMilliseconds();
    year = (year + '').substring(2);
    if (month <= 9) month = '0' + month;
    if (date <= 9) date = '0' + date;
    if (hours <= 9) hours = '0' + hours;
    if (minutes <= 9) minutes = '0' + minutes;
    if (seconds <= 9) seconds = '0' + seconds;
    let num = Math.ceil(Math.random() * 100);
    var id = year + month + date + hours + minutes + seconds + num;
    return id;
  },
};
export default utilsFun;
