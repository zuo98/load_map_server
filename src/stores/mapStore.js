import { defineStore } from "pinia";
import { ref } from "vue";
import { Map, View } from "ol";
import { OSM, XYZ } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";

export const useMapStore = defineStore("mapStore", () => {
  const mapInit = new Map({
    controls: [],
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
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
