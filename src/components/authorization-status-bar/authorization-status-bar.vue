<template>
  <div class="authorization-status-box status-bar success">
    <div>{{ $t('authorization.text_5') }}</div>

    <el-button text type="primary" :icon="IEpSwitch" @click="onSwitch">
      {{ $t('authorization.text_7') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const onSwitch = () => {
  router.push({ path: '/login', query: { jump: '0' } })
}
</script>

<style scoped lang="stylus">
@import "authorization-status-bar.styl"
</style>
