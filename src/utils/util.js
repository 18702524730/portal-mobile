import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import Vue from 'vue'

export function changeArr(baseArr, n) {
  const len = baseArr.length
  const lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
  const res = []
  for (let i = 0; i < lineNum; i++) {
    const temp = baseArr.slice(i * n, i * n + n)
    res.push(temp)
  }
  return res
}

export function judgeState() {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    return true
  } else {
    return false
  }
}

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}

export function arrayToStringObj(obj) {
  for (const i in obj) {
    if (obj[i] instanceof Array) {
      obj[i] = obj[i].join(',')
    }
  }
  return obj
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
  var regPos = /^\d+(\.\d+)?$/
  if (regPos.test(value)) {
    // 如果是数字
    const getDate = new Date(value)
    const o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  } else {
    value = value.trim()
    return value.substr(0, fmt.length)
  }
}


/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    const [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    const nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    const [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    const num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  const chats = '0123456789abcdef'
  return randomString(32, chats)
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand(css, id) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `@charset "UTF-8"; ${css}`
  // 清除旧样式
  if (id) {
    const $style = document.getElementById(id)
    if ($style != null) $style.outerHTML = ''
    style.id = id
  }
  // 应用新样式
  document.head.appendChild(style)
}