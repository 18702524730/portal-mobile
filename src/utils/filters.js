/**
 * 过滤器
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
function padding(s, len) {
  len = len - (s + '').length
  for (var i = 0; i < len; i++) {
    s = '0' + s
  }
  return s
}

export default {
  getQueryStringByName: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r !== null) context = r[2]
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  secondToHour: function(input) {
    if (typeof input !== 'number' && parseInt(input) !== input) {
      return input
    }
    const h = Math.floor(input / 3600)
    const m = Math.floor(input / 60)
    const s = input % 60
    const hh = h < 10 ? '0' + h : h
    const mm = m < 10 ? '0' + m : m
    const ss = s < 10 ? '0' + s : s
    return hh + ':' + mm + ':' + ss
  },
  sexFormat: function(inputs) {
    const str = inputs + ''
    if (str === '2') {
      return '男'
    }
    if (str === '1') {
      return '女'
    }
  },
  formatDate: {
    // 日期转yyyy-mm-dd格式
    format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function(dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int)
              break
            case 'M':
              _date.setMonth(_int - 1)
              break
            case 'd':
              _date.setDate(_int)
              break
            case 'h':
              _date.setHours(_int)
              break
            case 'm':
              _date.setMinutes(_int)
              break
            case 's':
              _date.setSeconds(_int)
              break
          }
        }
        return _date
      }
      return null
    },
    // 日期转时间戳
    timeStamp: function(date) {
      var timestamp = Date.parse(new Date(date))
      timestamp = timestamp / 1000
      return timestamp
    },
    // 日期格式转换
    dateFormat: function(input, type) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return '--'
      }
      var _date = new Date(input)
      var year = _date.getFullYear()
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
      var day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
      var hour = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes()
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : '0' + _date.getSeconds()
      if (type === 'date') {
        return year + '-' + month + '-' + day
      } else if (type === 'time') {
        return hour + ':' + minutes + ':' + seconds
      } else {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
      }
    },
    dateFormathm: function(input, type) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return '--'
      }
      var _date = new Date(input)
      var year = _date.getFullYear()
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
      var day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
      var hour = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes()
      return year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes
    },
    monthdayFormat: function(input, type) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return ''
      }
      var _date = new Date(input)
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
      var day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
      return month + '/' + day
    },
    hourminFormat: function(input, type) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return ''
      }
      var _date = new Date(input)
      var hour = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes()
      return hour + ':' + minutes
    },
    datesFormat: function(input) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return '--'
      }
      var _date = new Date(input)
      var year = _date.getFullYear()
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
      var day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
      return year + '-' + month + '-' + day
    },
    FormatTime: function(input, type) {
      if (input === null || input === '' || typeof input === 'undefined') {
        return '--'
      }
      var _date = new Date(input)
      var year = _date.getFullYear()
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
      var day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
      var hour = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes()
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : '0' + _date.getSeconds()
      if (type === 'date') {
        return year + '-' + month + '-' + day
      } else if (type === 'time') {
        return hour + ':' + minutes + ':' + seconds
      } else {
        return year + '-' + month + '-' + day
      }
    }
  }
}
