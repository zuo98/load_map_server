import axios from "axios";

import WMSCapabilities from "ol/format/WMSCapabilities";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

/**
 * @description -getCapabilities
 * @param {String} serverType -地图服务类型
 * @param {String} url -地图服务地址
 * @returns {Object} -返回capabilities对象
 */
export default getCapabilities = async (serverType, url) => {
  let options = {};
  switch (serverType) {
    case "arcgis":
      options = await getArcGISCapabilities(url);
      break;
    case "wms":
      options = await getWMSCapabilities(url);
      break;
    case "wmts":
      options = await getWMTSCapabilities(url);
      break;
    default:
      break;
  }
  return options;
};

/**
 * @description
 * @param {String} url -server url
 * @returns {Object}
 */
export const getArcGISCapabilities = (url) => {
  const baseUrl = `${url.split("?")[0]}?f=json`;
  return axios.get(baseUrl).then((res) => res.data || {});
};

/**
 * @description
 * @param {String} url -server url
 * @returns {Object}
 */
export const getWMSCapabilities = (url) => {
  const parser = new WMSCapabilities();
  const baseUrl = `${url.split("?")[0]}?request=GetCapabilities&service=wms`;
  return axios.get(baseUrl).then((res) => parser.read(res.data) || {});
};

/**
 * @description
 * @param {String} url -server url
 * @returns {Object}
 */
export const getWMTSCapabilities = (url) => {
  const parser = new WMTSCapabilities();
  const baseUrl = `${url.split("?")[0]}?request=GetCapabilities&service=wmts`;
  return axios.get(baseUrl).then((res) => parser.read(res.data) || {});
};
