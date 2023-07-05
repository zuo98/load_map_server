import TileLayer from "ol/layer/Tile";
import TileArcGISRest from "ol/source/TileArcGISRest";
import TileWMS from "ol/source/TileWMS";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import XYZ from "ol/source/XYZ";

/**
 * @description -create TileLayer with tileArcGISRest
 * @param {String} url
 * @returns {import('ol/layer/Layer')|null}
 */
export const getArcGISLayer = (url) => {
  const baseUrl = url.split("?")[0];
  if (baseUrl) {
    return new TileLayer({
      source: new TileArcGISRest({
        url: baseUrl,
      }),
    });
  } else {
    return null;
  }
};

/**
 * @description -create TileLayer with TileWMS
 * @param {String} url
 * @param {Array[String]} layerNames
 * @returns {import('ol/layer/Layer')|null}
 */
export const getWMSLayer = (url, layerNames = []) => {
  const baseUrl = url.split("?")[0];
  if (baseUrl && layerNames) {
    const paramLayers = layerNames.join(",");
    return new TileLayer({
      source: new TileWMS({
        url: baseUrl,
        params: { LAYERS: paramLayers, TILED: true },
      }),
    });
  } else {
    return null;
  }
};

/**
 * @description create TileLayer with WMTS
 * @param {Object} capabilities
 * @param {Array[String]} layerNames
 * @returns {import('ol/layer/Layer')|null}
 */
export const getWMTSLayer = (capabilities, layerNames = []) => {
  if (capabilities & layerNames) {
    const paramLayers = layerNames.join(",");
    const options = optionsFromCapabilities(capabilities, {
      layer: paramLayers,
      matrixSet: "EPSG:3857",
    });
    return new TileLayer({
      source: new WMTS(options),
    });
  } else {
    return null;
  }
};

/**
 * @description
 * @param {String} url -server url
 * @returns {import('ol/layer/Layer')}
 */
export const getXYZLayer = (url) => {
  if (url) {
    return new TileLayer({
      source: new XYZ({
        url: url,
      }),
    });
  } else {
    return null;
  }
};
