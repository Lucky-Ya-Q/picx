<template>
  <div class="page-container login-container">
    <div class="box-item">
      <el-button plain type="primary" size="large" @click="onTokenLogin">
        {{ $t('authorization.text_2') }}
      </el-button>
      <div class="tips-box">
        <div class="tip-item">{{ $t('authorization.text_9') }}</div>
        <div class="tip-item link" @click="goTargetUrl(UrlTypeEnum.tokenLoginDocs)">
          <el-icon><IEpDocument /></el-icon>
          {{ $t('authorization.text_10') }}
        </div>
        <div class="tip-item link" @click="goTargetUrl(UrlTypeEnum.generateTokenURL)">
          <el-icon><IEpLink /></el-icon>
          {{ $t('authorization.text_12') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import router from '@/router'
import { store } from '@/stores'
import { UrlTypeEnum } from '@/views/picx-login/picx-login.model'

const userConfigInfo = computed(() => store.getters.getUserConfigInfo).value

const onTokenLogin = () => {
  router.push({ path: '/config', query: { focus: '1' } })
}

const goTargetUrl = (type: UrlTypeEnum) => {
  const url = 'https://picx-docs.xpoet.cn'

  switch (type) {
    case UrlTypeEnum.generateTokenURL:
      window.open('https://github.com/settings/tokens/new')
      break

    case UrlTypeEnum.tokenLoginDocs:
      window.open(`${url}/usage-guide/config.html#填写-github-token-登录`)
      break

    default:
      window.open(url)
  }
}

const init = () => {
  const { token, name, owner, repo, branch, selectedDir: dir, logined } = userConfigInfo

  if (router.currentRoute.value.query?.jump !== '0') {
    if (token && name && owner && logined) {
      if (repo && branch && dir) {
        router.push('/upload')
      } else {
        router.push('/config')
      }
    }
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="stylus">
@import "./picx-login.styl"
</style>
