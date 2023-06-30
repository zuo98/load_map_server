import Layer from "ol/layer/Layer";

class BaseLayer {
  constructor(url, name) {
    this._url = url?.split("?")[0];
    this.name = name;
    this.layer = null;
    this.capabilities = null;
    this._createCapabilities();
  }
  _createLayer() {
    throw new Error("Function not implemented.");
  }
  _createCapabilities() {
    throw new Error("Function not implemented.");
  }
  getLayer() {
    if (this.layer instanceof Layer) {
      return this.layer;
    } else {
      return this._createLayer();
    }
  }
  setName(name) {
    this.name = name;
  }
  getUrl() {
    return this._url;
  }
  getCapabilities() {
    if (this.capabilities) {
      return this.capabilities;
    } else {
      this._createCapabilities();
    }
  }
}

export default BaseLayer;
