import { reactive } from "vue";
import Layer from "ol/layer/Layer";
import ArcGISLayer from "../script/map/ArcGISLayer";
import WMSLayer from "../script/map/WMSLayer";
import WMTSLayer from "../script/map/WMTSLayer";
/**
 *
 * @param {*} opts
 * @returns
 */
export const useLoadMapServer = (opts) => {
  const { map, afterAddFunc = () => {} } = opts;
  const serverType = [
    {
      value: "arcgis",
      label: "ArcGIS Server Web Service",
    },
    {
      value: "wms",
      label: "OGC WMS",
    },
    {
      value: "wmts",
      label: "OGC WMTS",
    },
  ];

  const serverForm = reactive({
    type: "",
    url: "",
    name: "",
  });

  const getLayer = async (serverForm) => {
    let layer = null;
    switch (serverForm.type) {
      case "arcgis":
        const arcLayer = new ArcGISLayer(serverForm.url, serverForm.name);
        console.log("arcLayer: ", arcLayer);
        layer = arcLayer.getLayer();

        break;
      case "wms":
        const wmsLayer = new WMSLayer(serverForm.url, serverForm.name);
        console.log("wmsLayer: ", wmsLayer);
        layer = wmsLayer.getLayer();
        break;
      case "wmts":
        const wmtsLayer = new WMTSLayer(serverForm.url, serverForm.name);
        console.log("wmtsLayer: ", wmtsLayer);
        layer = await wmtsLayer.getLayer();
      default:
        break;
    }
    console.log("layer: ", layer);
    return layer;
  };
  const add2Map = async () => {
    const layer = await getLayer(serverForm);
    console.log("layer: ", layer);
    if (layer instanceof Layer) {
      console.log(": ");
      map?.addLayer(layer);
    }
    console.log("map: ", map, map?.getLayers());
    afterAddFunc();
    serverForm.type = "";
    serverForm.name = "";
    serverForm.url = "";
  };

  return { serverType, serverForm, add2Map };
};
