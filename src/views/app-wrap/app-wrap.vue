<template>
  <el-config-provider :size="elementPlusSize" :z-index="3000" :locale="elementPlusLocale">
    <main-container />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import setThemeMode from '@/utils/set-theme-mode'
import { useStore } from '@/stores'
import { throttle } from '@/utils'
import { ElementPlusSizeEnum } from '@/common/model'
import MainContainer from '@/views/main-container/main-container.vue'

const store = useStore()
const elementPlusSize = ref<ElementPlusSizeEnum>(ElementPlusSizeEnum.default)
const elementPlusLocale = zhCN

const elementPlusSizeHandle = (width: number) => {
  if (width <= 700) {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.small,
      folded: true
    })
    elementPlusSize.value = ElementPlusSizeEnum.small
  } else if (width <= 1000) {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.default,
      folded: false
    })
    elementPlusSize.value = ElementPlusSizeEnum.default
  } else {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.large,
      folded: false
    })
    elementPlusSize.value = ElementPlusSizeEnum.large
  }
}

const init = () => {
  elementPlusSizeHandle(window.innerWidth)
  window.addEventListener(
    'resize',
    throttle((e: any) => {
      elementPlusSizeHandle(e.target.innerWidth)
    }, 600)
  )

  setThemeMode()
  // eslint-disable-next-line no-underscore-dangle
  window.pluginWebUpdateNotice_?.setLocale('zh_CN')
}

onMounted(() => {
  init()
})
</script>
