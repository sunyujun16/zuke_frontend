import axios from "axios";

// 在组件或store中实际发送请求时，可以传入config参数{withCredentials: false}来针对性阻止这个选项。
axios.defaults.withCredentials = true;

// 此处可以配置拦截器？比如处理error状态码，比如401就给个请登录的提示。

export default axios;
