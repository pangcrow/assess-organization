import axios from "axios";
import { recommendURL } from "./BaseAPI";

export const selectNeed = () => axios.get(`${recommendURL}/selectneed`);

export const selectSchool = () => axios.get(`${recommendURL}/school`);

export const addSchool = body => axios.post(`${recommendURL}/addSchool`, body);

export const recommend = body => axios.post(`${recommendURL}/recommend`, body);
