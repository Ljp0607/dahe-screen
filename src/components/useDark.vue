<!-- 暗黑模式 -->

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div>
    <span @click.stop="toggleDark()">暗黑模式</span>
    <el-switch v-model="isDark" />
  </div>
</template>
