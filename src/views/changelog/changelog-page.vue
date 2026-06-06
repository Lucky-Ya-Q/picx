<template>
  <div class="page-container changelog-page-container">
    <el-timeline v-if="changelogList.length">
      <el-timeline-item
        v-for="item in changelogList"
        :key="item.version + item.date"
        :timestamp="formatDate(item.date)"
        placement="top"
      >
        <div class="changelog-card border-box">
          <div class="changelog-header">
            <span class="version">{{ item.version }}</span>
          </div>
          <ul class="changelog-items" v-if="item.items.length">
            <li v-for="(line, idx) in item.items" :key="idx">{{ line }}</li>
          </ul>
        </div>
      </el-timeline-item>
    </el-timeline>

    <el-empty v-else :description="$t('changelog.empty')" />
  </div>
</template>

<script setup lang="ts">
import { formatDatetime } from '@/utils'
import { changelogList } from '@/views/changelog/changelog.data'

const formatDate = (date: string) => {
  return formatDatetime('yyyy-MM-dd', new Date(date).getTime())
}
</script>

<style scoped lang="stylus">
@import "./changelog.styl"
</style>
