
import {Loading} from 'element-ui'
let loading //定义loading变量
/**
 * 使用Element loading-start 方法
 * @param {*} params 具体参数使用参照element ui
 */
function startLoading(params) {
  let target=params.target?document.querySelector(params.target):''
  loading = Loading.service({
      lock: true,
      text:params.text||'加载中...',//显示在加载图标下方的加载文案
      background:params.background||'',//遮罩背景色
      target: target,//需要覆盖的 DOM 节点
      spinner:params.spinner||'',//自定义加载图标类名
      customClass:params.customClass||'',//Loading 的自定义类名
  })
}
//使用Element loading-close 方法
function endLoading() {
  loading.close()
}
/**
 * 声明一个变量 loadCount
 * 每次调用showLoading方法 loadCount + 1。
 */
let loadCount = 0
export function showLoading(params) {
  if (loadCount === 0) {
      startLoading(params)
  }
  loadCount++
}
/**
 * loadCount - 1。
 * loadCount 0 时，结束 loading。
 */
export function hideLoading() {
  if (loadCount <= 0) return
  loadCount--
  if (loadCount === 0) {
      endLoading()
  }
}
/**
 * 判断字符是否为空的方法
 * 返回值为true时代表是空值
 */
export function isEmpty(obj,type='String'){
  if(type === 'Object'){
    if(JSON.stringify(obj) === '{}' || typeof obj == "undefined" || obj == null){
      return true;    //如果为空，返回false
    }
    return false;    //如果不为空，返回true
  }
  if(typeof obj == "undefined" || obj == null || obj == ""){
      return true;
  }else{
      return false;
  }
}
/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 去除空格
 * @param  {str}
 * @param  {type} 
 *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
export function trimStr(str, type){
	if(!str){
		return str;
	}
	type = type || 1
  str=str.toString();
	switch (type) {
	  case 1:
		return str.replace(/\s+/g, "");
	  case 2:
		return str.replace(/(^\s*)|(\s*$)/g, "");
	  case 3:
		return str.replace(/(^\s*)/g, "");
	  case 4:
		return str.replace(/(\s*$)/g, "");
	  default:
		return str;
	}
}
/**
 * 日期加减天数
 * @param {*} num 天数，默认加1天
 * @param {*} date 日期(yyyy-mm-dd)默认当前日期
 */
export function dateChange(day = 1,date = false) {
  　　if (!date) {
  　　　　date = new Date();//没有传入值时,默认是当前日期
         let month=date.getMonth() + 1;
         month=month>9?month:'0'+month;
         let dateDay=date.getDate();
         dateDay=dateDay>9?dateDay:'0'+dateDay;
  　　　　date = date.getFullYear() + '-' + month+ '-' + dateDay;
  　　}
  　　date += " 00:00:00";//设置为当天凌晨12点
  　　date = Date.parse(new Date(date))/1000;//转换为时间戳
  　　date += (86400) * day;//修改后的时间戳
  　　var newDate = new Date(parseInt(date) * 1000);//转换为时间
      let month=newDate.getMonth() + 1;
      month=month>9?month:'0'+month;
      let dateDay=newDate.getDate();
      dateDay=dateDay>9?dateDay:'0'+dateDay;
  　　return newDate.getFullYear() + '-' +month+ '-' +dateDay;
}
/**
 * 根据身份证号获取出生年月日
 */
 export function getBirth(IdCardNo){
	var yearBirth = IdCardNo.substring(6,10);
	var monthBirth = IdCardNo.substring(10,12);
	var dayBirth = IdCardNo.substring(12,14);
	let Birth=`${yearBirth}-${monthBirth}-${dayBirth}`
	return Birth;
}
/**
 * 根据日期计算年龄
 * @param {Object} strBirthday,格式YYYY-MM-DD
 */
export function getAge(strBirthday) {
	var returnAge;
	var strBirthdayArr = strBirthday.split('-');
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];
	//获取当前日期
	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();
	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}
/**
 * 通过身份证判断是男是女 
 * @param idcard 15/18位身份证号码  
 * @return 1-男 、2-女
 */
export function getSex(idcard) {
  idcard = trimStr(idcard,1);// 对身份证号码做处理。包括字符间有空格。  
  if(idcard.length==15){  
      if(idcard.substring(14,15)%2==0){  
          return 2;  
      }else{  
          return 1;  
      }  
  }else if(idcard.length ==18){  
      if(idcard.substring(14,17)%2==0){  
          return 2;  
      }else{  
          return 1;  
      }  
  }else{  
      return null;  
  }  
}
/**
 * 数组过滤
 * @param {*} array 过滤的数组
 * @param {*} code 需要匹配的code 
 * @param {*} keyName 数组中匹配的key名字
 * return Array
 */
export function filterArray(array,code,keyName) {
  let name=keyName?keyName:'CategoryCode';
  return array.filter(item => item[name] == code)
}
export function handleRisk(highRiskLevel){
  let heavyHighRiskLevel= [...new Set(highRiskLevel)];//去重
  let sortHighRiskLevel=heavyHighRiskLevel.sort((a, b)=>{
      return b-a;
  });//风险级别排序-降序
  let showHighRiskLevel=[];
  if(sortHighRiskLevel.includes('16')){
      showHighRiskLevel.push('16');
      if(sortHighRiskLevel.length>1&&sortHighRiskLevel[1]!='16'){
          showHighRiskLevel.push(sortHighRiskLevel[1]);
      }
  }else if(sortHighRiskLevel.length>0){
      showHighRiskLevel.push(sortHighRiskLevel[0]);
  }
  return showHighRiskLevel;
}
/**
 * 判断token是否过期
 * @param {*} time 过期时间
 */
 export function isTokenExpired(expiredTime) {
  expiredTime= new Date(expiredTime).getTime() / 1000
  let nowTime = new Date().getTime() / 1000;//获取本地时间
  //如果 < n分钟，则说明即将过期
  let soon=(expiredTime - nowTime) < 1*60;
  //已经过期
  let already=expiredTime<nowTime;
  return soon||already
}
