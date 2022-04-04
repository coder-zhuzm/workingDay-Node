import axios from "axios";
import schedule from "node-schedule";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config("./env");
// dotenv.config('./.env.example');  you setting
import { getHoliday } from "./services/holiday.mjs";
import { pushMsg } from "./services/pushMsg.mjs";
import { getWeather } from "./services/weather.mjs";

function getypeMsg(val) {
  let msg = "";
  switch (val) {
    case 0:
      msg = "工作日,记得定闹钟哦~";
      break;
    case 1:
      msg = "周末,记得取消闹钟,好好休息~";
      break;
    case 2:
      msg = "法定节假日,记得取消闹钟,好好休息~";
      break;
    case 3:
      msg = "调休,记得开启闹钟哦~";
      break;
    default:
      msg = "未知结果";
      break;
  }
  return msg;
}
//推送 节假日提醒
const pushHolidayRemind = async () => {
  // 节假日类型，分别表示 0  工作日、1 周末、2 节日、3调休。
  const data = await getHoliday(dayjs().add(1, "day").format("YYYY/MM/DD"));
  const { type, name } = data;
  //{ type: 2, name: '清明节', week: 1 }
  const typeMsg = getypeMsg(type);
  const title = "明日提醒";
  const msg = `#### 明日提醒 \n 明天是${name}, ${typeMsg} `;
  pushMsg(title, msg);
};

// 每天 定时任务  21:10 推送工作日信息
schedule.scheduleJob(`0 10 21* * 0-7`, function () {
  pushHolidayRemind();
});

const pushWeatherRemind = async (city) => {
  const msg = await getWeather(city);
  pushMsg("天气提醒", msg);
};
// 每天 定时任务  20:10 推送第二天天气情况
schedule.scheduleJob(`30 30 18 * * 0-7`, function () {
  pushWeatherRemind("杭州");
});
