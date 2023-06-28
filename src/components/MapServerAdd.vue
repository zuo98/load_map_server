<script setup>
import { defineComponent } from "vue";

defineComponent({ namE: "MapServerAdd" });

const props = defineProps({
  showDialog: {
    type: Boolean,
    required: true,
    default: false,
  },
});

var isShow = computed({
  set(val) {
    emit("update:showDialog", val);
  },
  get() {
    return props.showDialog;
  },
});
</script>
<template>
  <el-dialog
    v-model="isShow"
    title="Tips"
    width="30%"
    draggable
    @closed="isShow = false"
  >
    <span>It's a draggable Dialog</span>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>