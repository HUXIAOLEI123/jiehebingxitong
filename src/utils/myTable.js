import XEUtils from 'xe-utils'
/*
 *@method: wxdFooterMethod 处理vxe表格中的合计数据
 *@params:sumIndex 合计单元格所在索引, columns  rowDatas, handlePropertyArr（要处理的列对应的属性名）, digits 标识处理合计后的有效数字位数
 *@return: 返回一个二维数组
 */
export function wxdFooterMethod(columns, rowDatas, handlePropertyArr, sumIndex = 1, digits = 2) {
    return [
        columns.map((column, columnIndex) => {
            if (columnIndex == sumIndex) {
                return '合计'
            }
            if (handlePropertyArr.includes(column.property)) {
                return wxdSumNum(rowDatas, column.property, digits);
            }
        })
    ]
}
/*
 *@method: wxdFooterCellClassName 处理vxe表格中的合计数据
 *@params:sumIndex 合计单元格所在索引, column   handleProperty 需要处理的列所对应的属性名, digits 标识处理合计后的有效数字位数，默认2位
 *@return: 返回一个二维数组
 */
export function wxdFooterCellClassName(column, columnIndex, handlePropertyArr, sumIndex = 1) {
    if (columnIndex == sumIndex) {
        return "col-red";
    } else if (handlePropertyArr.includes(column.property)) {
        return "col-blue";
    } else {
        return "col-red";
    }
}

/*
 *@method: mySumNum 处理vxe表格中的合计数据
 *@params: rowDatas 表格行数组  handleProperty 需要处理的列所对应的属性名, digits 标识处理合计后的有效数字位数，默认2位
 *@return: 返回一个二维数组
 */

function wxdSumNum(rowDatas, handleProperty, digits = 2) {
    let count = 0;
    rowDatas.forEach(row => {
        if (row[handleProperty]) {
            count += Number(row[handleProperty])
        }
    })
    if (count != 0) {
        return XEUtils.commafy(XEUtils.toNumber(count), { digits });
    }
}


/**
 * 金额处理:保留几位小数，不四舍五入(关于金额数值的处理用这个方法)
 * @param num   金额
 * @param decimal   保留位数
 * @returns {string}
 */
export function moneyFormatDecimal(num, decimal = 2) {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}