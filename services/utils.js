export function dateFormat(now) {
  const datelist = ["日", "一", "二", "三", "四", "五", "六"];
  let year = now.getFullYear(); //当前年份
  let month = now.getMonth() + 1; // 当前月份
  let day = now.getDay(); //获取当前 日
  let hour = now.getHours(); //获取当前小时
  let minute = now.getMinutes(); //获取当前 分钟
  minute = minute < 10 ? "0" + minute : minute;
  // let second = now.getSeconds(); //获取当前秒
  let date = now.getDate(); //获取当前星期几
  return `当前时间 ${year}年${month}月${day}日${hour}时${minute}分 星期${datelist[date]}`;
}
