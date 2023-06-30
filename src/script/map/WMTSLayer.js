import BaseLayer from "./BaseLayer";
import TileLayer from "ol/layer/Tile";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getTopLeft, getWidth } from "ol/extent";
import axios from "axios";

class WMTSLayer extends BaseLayer {
  constructor(url, name) {
    super(url, name);
  }
  _createLayer() {
    // if (this.capabilities) {
    return this._createCapabilities().then(() => {
      const options = optionsFromCapabilities(this.capabilities, {
        // layer: this.name,
        // matrixSet: "EPSG:3857",
      });
      this.layer = new TileLayer({
        source: new WMTS(options),
      });
      return this.layer;
    });
    // } else {
    //   const projection = getProjection("EPSG:3857");
    //   const projectionExtent = projection.getExtent();
    //   const size = getWidth(projectionExtent) / 256;
    //   const resolutions = new Array(19);
    //   const matrixIds = new Array(19);
    //   for (let z = 0; z < 19; ++z) {
    //     // generate resolutions and matrixIds arrays for this WMTS
    //     resolutions[z] = size / Math.pow(2, z);
    //     matrixIds[z] = z;
    //   }

    //   this.layer = new TileLayer({
    //     source: new WMTS({
    //       url: this._url,
    //       layer: this.name,
    //       matrixSet: "EPSG:3857",
    //       projection: projection,
    //       tileGrid: new WMTSTileGrid({
    //         origin: getTopLeft(projectionExtent),
    //         resolutions: resolutions,
    //         matrixIds: matrixIds,
    //       }),
    //     }),
    //   });
    //   return this.layer;
    // }
  }

  _createCapabilities() {
    const parser = new WMTSCapabilities();
    return axios
      .get(`${this._url}?request=GetCapabilities&service=wmts`)
      .then((res) => (this.capabilities = parser.read(res.data) || {}));
  }
}

export default WMTSLayer;
