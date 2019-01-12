import axios from "axios";
import { assessURL } from "./BaseAPI";

export const all = () => axios.get(`${assessURL}/all`);

export const saveComment = body => axios.post(`${assessURL}/saveComment`, body);

//模拟form表单提交post请求下载文件
export const download = PARAMS => {
  var temp = document.createElement("form");
  temp.action = `${assessURL}/download`;
  temp.method = "post";
  temp.style.display = "none";

  var opt = document.createElement("input");
  opt.type = "text";
  opt.name = "assessid";
  opt.value = PARAMS;
  temp.appendChild(opt);

  document.body.appendChild(temp);
  temp.submit();
  return temp;
};
