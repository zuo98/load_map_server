import { defineStore } from "pinia";
import { ref } from "vue";
import { Map, View } from "ol";
import { OSM, XYZ } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile.js";
import MVT from "ol/format/MVT";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const useMapStore = defineStore("mapStore", () => {
  const mapInit = new Map({
    controls: [],
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        }),
      }),
      new VectorTileLayer({
        declutter: false,
        source: new VectorTileSource({
          format: new MVT(),
          url: "http://127.0.0.1:8000/mvt/{z}/{x}/{y}",
        }),
        style: new Style({
          stroke: new Stroke({
            color: "red",
            width: 2,
          }),
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([114.2, 30.55]),
      zoom: 12,
    }),
  });
  const map = ref(mapInit);

  return { map };
});
