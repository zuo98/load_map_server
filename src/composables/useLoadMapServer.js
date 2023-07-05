import { reactive } from "vue";
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
    serverLayers: [],
  });

  const getLayer = async (serverForm) => {
    let layer = null;
    switch (serverForm.type) {
      case "arcgis":
        break;
      case "wms":
        break;
      case "wmts":
      default:
        break;
    }
    return layer;
  };
  const add2Map = async () => {
    const layer = await getLayer(serverForm);
    if (layer instanceof Layer) {
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
