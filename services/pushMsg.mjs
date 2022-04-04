import axios from "axios";
function pushMsg(title, msg) {
  const webHookApi = process.env.apiURL;
  console.log(title, msg);
  axios
    .post(webHookApi, {
      msgtype: "markdown",
      markdown: {
        title: title,
        text: msg,
      },
    })
    .then((response) => {
      console.log(`推送消息 ${title}`, response.data);
    })
    .catch((error) => {
      console.log(error.message);
      pushError(`推送消息${title} ${error.message}`);
    });
}

function pushError(msg) {
  const webHookApi = process.env.apiURL;
  axios
    .post(webHookApi, {
      msgtype: "markdown",
      markdown: {
        title: "错误提醒",
        text: msg,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
export { pushMsg, pushError };
