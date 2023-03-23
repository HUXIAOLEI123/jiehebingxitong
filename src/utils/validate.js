/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @method: isArray
 * @description: 判断是否是数组
 * @params: arg 待判断参数
 * @return: Boolean
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
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
	type = type || 1;
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
 * 是否正整数
 * @param {*} str 
 */
export function positiveInt(str){
	let reg=/^[0-9]+$/;
	return reg.test(str);
  }
/**
 * 是否数字
 * @param {*}
 */
export function number(str){
	let re =  /^(([1-9][0-9]*\.[0-9][0-9]*)|(\d\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/g;
	return re.test(str);
}
/**
 * 手机号码是否正确
 * @param {*} str 
 * @returns {Boolean} true/false
 */
export function validatePhone(str){
  return  /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(str);
}
/**
 * 固话是否正确
 * @param {*} str 
 * @returns {Boolean} true/false
 */
export function validateTel(str){
  return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
}
/**
 * 文本是否含有表情
 * @returns {Boolean} true/false
 */
export function checkoutEnjon(str) {
  var reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  return reg.test(str);
}
/**
 * 身份证号是否正确
 * 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
 * @param {*} idcode 
 * @returns {Boolean} true/false
 */
 export function checkIDCard(idcode) {
	// 加权因子
	var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	// 校验码
	var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

	var code = idcode + "";
	var last = idcode[17]; //最后一位

	var seventeen = code.substring(0, 17);

	// ISO 7064:1983.MOD 11-2
	// 判断最后一位校验码是否正确
	var arr = seventeen.split("");
	var len = arr.length;
	var num = 0;
	for (var i = 0; i < len; i++) {
		num = num + arr[i] * weight_factor[i];
	}

	// 获取余数
	var resisue = num % 11;
	var last_no = check_code[resisue];

	// 格式的正则
	// 正则思路
	/*
	第一位不可能是0
	第二位到第六位可以是0-9
	第七位到第十位是年份，所以七八位为19或者20
	十一位和十二位是月份，这两位是01-12之间的数值
	十三位和十四位是日期，是从01-31之间的数值
	十五，十六，十七都是数字0-9
	十八位可能是数字0-9，也可能是X
	*/
	var idcard_patter =
		/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

	// 判断格式是否正确
	var format = idcard_patter.test(idcode);

	// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
	return last === last_no && format ? true : false;
}