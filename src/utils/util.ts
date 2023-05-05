import moment from 'moment';
export const changeNumber = (num: number | undefined) => {
  return num && num > 10000 ? Math.floor(num / 10000) + '万' : num;
}
export const changeTimer = (timer: number | undefined) => {
  return timer && moment(timer).format('YYYY-MM-DD')
}

