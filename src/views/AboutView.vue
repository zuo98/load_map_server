<script setup >
import { defineComponent } from "vue";
import { Switch } from "@element-plus/icons-vue";

defineComponent({ name: "AboutView" });
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello map!</h1>
    <el-button-group>
      <el-button
        ><RouterLink to="map"
          ><el-icon><Switch /></el-icon></RouterLink
      ></el-button>
    </el-button-group>
  </div>
</template>