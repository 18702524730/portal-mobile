import Vue from 'vue'
import moment from 'moment'

Vue.filter('changeDate', (time) => {
  if (time === null || time === undefined || time === '') {
    return '无'
  }
  time = time.replace(/-/g, '/')
  const date = new Date(time)
  return moment(date).format('YYYY-MM-DD')
})

Vue.filter('dateFormat', (time) => {
  return moment(time).format('YYYY-MM-DD')
})