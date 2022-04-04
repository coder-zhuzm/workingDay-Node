import axios from "axios";
function getWeather(city) {
  console.log("获取天气", city);
  const weatherApi = process.env.weatherApi;
  return new Promise((resolve, reject) => {
    axios
      .get(`${weatherApi}${encodeURI(city)}`)
      .then((res) => {
        const { wea, tem_day, tem_night, win, win_speed } = res.data.data[1];
        const weather = `明日天气:${wea}\n最高气温:${tem_day}度\n最低气温:${tem_night}度\n${win}\n风速${win_speed}`;
        resolve(weather);
      })
      .catch((error) => {
        console.log("获取天气出错", error.message);
        reject(`${"获取天气出错"} error.message`);
      });
  });
}
export { getWeather };
