<script setup>
import { defineComponent } from "vue";
import { useLoadMapServer } from "../composables/useLoadMapServer";

import { UploadFilled } from "@element-plus/icons-vue";

defineComponent({ namE: "MapServerAdd" });

const props = defineProps({
  showDialog: {
    type: Boolean,
    required: true,
    default: false,
  },
  map: {
    type: Object,
    require: true,
    default: null,
  },
});

const emit = defineEmits(["show-change"]);

const dialogVisible = computed({
  set(val) {
    emit("show-change", val);
  },
  get() {
    return props.showDialog;
  },
});

const activeTabName = ref("url");

const { serverType, serverForm, add2Map } = useLoadMapServer({
  map: props.map,
});
</script>
<template>
  <el-dialog
    use-theme
    v-model="dialogVisible"
    title="Add Data to Map"
    width="30%"
    draggable
    @closed="dialogVisible = false"
  >
    <template #header>
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="Enter URL" name="url"></el-tab-pane>
        <el-tab-pane label="Add Files" name="file"></el-tab-pane>
      </el-tabs>
    </template>
    <template v-if="activeTabName == 'url'">
      <el-form :model="serverForm" label-width="60px" label-position="top">
        <el-form-item label="Type:">
          <el-select
            v-model="serverForm.type"
            placeholder="please select server type"
            style="width: 100%"
          >
            <el-option
              v-for="item in serverType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="URL:">
          <el-input v-model="serverForm.url" placeholder="Enter URL" />
        </el-form-item>
        <el-form-item label="Name:">
          <el-input v-model="serverForm.name" placeholder="Layer name" />
        </el-form-item>
      </el-form>
    </template>
    <template v-if="activeTabName == 'file'">
      <el-upload
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
    </template>
    <template #footer v-if="activeTabName == 'url'">
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              add2Map();
              dialogVisible = false;
            }
          "
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>