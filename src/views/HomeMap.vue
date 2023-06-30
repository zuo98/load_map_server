<script setup>
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { useMapStore } from "../stores/mapStore";
import { RouterLink } from "vue-router";
import { Plus, Location, Switch } from "@element-plus/icons-vue";

import MapServerAdd from "../components/MapServerAdd.vue";

defineComponent({ name: "HomeMap" });
const { map } = useMapStore();
onMounted(() => {
  map?.setTarget("map");
});
onBeforeUnmount(() => {
  map?.setTarget(undefined);
});
const showDialog = ref(false);
</script>

<template>
  <div id="map" class="h-full w-full"></div>
  <el-button-group class="absolute top-2 left-2">
    <el-button :icon="Plus" @click="showDialog = true" />
    <el-button :icon="Location" />
    <el-button
      ><RouterLink to="about"
        ><el-icon><Switch /></el-icon></RouterLink
    ></el-button>
  </el-button-group>
  <MapServerAdd
    :show-dialog="showDialog"
    :map="map"
    @show-change="showDialog = false"
  ></MapServerAdd>
</template>
