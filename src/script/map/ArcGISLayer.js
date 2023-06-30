import axios from "axios";
import TileLayer from "ol/layer/Tile";
import TileArcGISRest from "ol/source/TileArcGISRest";
import BaseLayer from "./BaseLayer";

class ArcGISLayer extends BaseLayer {
  constructor(url, name) {
    super(url, name);
  }

  _createLayer() {
    this.layer = new TileLayer({
      source: new TileArcGISRest({
        url: this._url,
      }),
    });
    return this.layer;
  }

  _createCapabilities() {
    axios.get(`${this._url}?f=json`).then((res) => {
      this.capabilities = res.data || {};
    });
  }
}

export default ArcGISLayer;
