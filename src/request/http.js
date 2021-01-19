import axios from "axios";
import router from "../router";
// import store from "../store";
import qs from "qs";
// import { Message, Spin, LoadingBar } from "view-design";
const tip = msg => {
  //   Message.error(msg);
};
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};
const errorHandle = (status, other) => {
  // Spin.hide();
  setTimeout(() => {
    switch (status) {
      case "600000":
        toLogin();
        break;
      case "100002":
        tip("用户名或密码错误");
        break;
      case "100000":
        tip("登录过期");
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        toLogin();
        break;
      default:
        tip(other);
        break;
    }
  }, 200);
};
var instance = axios.create({
  timeout: 1000 * 12
});
instance.defaults.headers.post["Content-Type"] = "application/json";
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // Spin.show();
    if (config.method === "get") {
      config.paramsSerializer = function(params) {
        //序列化参数
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
      return config;
    } else {
      return config;
    }
  },
  error => Promise.error(error)
);
// 响应拦截器
instance.interceptors.response.use(res => {
  if (res.data.resultCode == 0) {
    // Spin.hide();
    return Promise.resolve(res.data);
  } else {
    errorHandle(res.data.resultCode, res.data.resultMessage);
    return Promise.reject(res.data);
  }
});
export default instance;
