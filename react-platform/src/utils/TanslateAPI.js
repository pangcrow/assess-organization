import axios from "axios";
import { translateURL } from "./BaseAPI";

export const all = () => axios.get(`${translateURL}/all`);

export const finish = body => axios.post(`${translateURL}/finish`, body);

export const upload = formdata =>
  axios.post(`${translateURL}/upload`, formdata, {
    headers: { "Content-Type": "multipart/form-data" }
  });

//模拟form表单提交post请求下载文件
export const download = PARAMS => {
  var temp = document.createElement("form");
  temp.action = `${translateURL}/download`;
  temp.method = "post";
  temp.style.display = "none";

  var opt = document.createElement("input");
  opt.type = "text";
  opt.name = "articleid";
  opt.value = PARAMS;
  temp.appendChild(opt);

  document.body.appendChild(temp);
  temp.submit();
  return temp;
};
