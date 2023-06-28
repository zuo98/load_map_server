import { defineStore } from "pinia";
import { ref } from "vue";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";

export const useMapStore = defineStore("mapStore", () => {
  const mapInit = new Map({
    controls: [],
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([37.41, 8.82]),
      zoom: 4,
    }),
  });
  const map = ref(mapInit);

  return { map };
});
