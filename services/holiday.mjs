import axios from "axios";
import dayjs from "dayjs";
import { pushError } from "./pushMsg.mjs";
/*
{
  "code": 0,              // 0服务正常。-1服务出错
  "type": {
    "type": enum(0, 1, 2, 3), // 节假日类型，分别表示 0  工作日、1 周末、2 节日、3调休。
    "name": "周六",         // 节假日类型中文名，可能值为 周一 至 周日、假期的名字、某某调休。
    "week": enum(1 - 7)    // 一周中的第几天。值为 1 - 7，分别表示 周一 至 周日。
  }
}
 */

/**
 * 传入日期
 * @param {*} date
 */
function getHoliday(date) {
  const holidayApi = process.env.holidayApi;
  return new Promise((resolve, reject) => {
    console.log(dayjs().format("yyyy/mm/dd"), "调用节假日判断");
    axios
      .get(`${holidayApi}date`)
      .then((res) => {
        const data = res.data;
        if (data?.type) {
          const { type } = data;
          resolve(type);
        }
        reject("请求出错");
      })
      .catch((error) => {
        console.log(error.message, 222);
        pushError(`节假日调用错误,请及时查看 ${error.message}`);
      });
  });
}
export { getHoliday };
