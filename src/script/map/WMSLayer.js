import BaseLayer from "./BaseLayer";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import WMSCapabilities from "ol/format/WMSCapabilities";
import axios from "axios";

class WMSLayer extends BaseLayer {
  constructor(url, name) {
    super(url, name);
  }

  _createLayer() {
    this.layer = new TileLayer({
      source: new TileWMS({
        url: this._url,
        params: { LAYERS: this.name, TILED: true },
      }),
    });
    return this.layer;
  }

  _createCapabilities() {
    const parser = new WMSCapabilities();
    axios
      .get(`${this._url}?request=GetCapabilities&service=wms`)
      .then((res) => (this.capabilities = parser.read(res.data) || {}));
  }
}

export default WMSLayer;
