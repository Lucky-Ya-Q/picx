import { computed } from 'vue'
import { store } from '@/stores'
import { DirModeEnum } from '@/common/model'
import {
  createRepo,
  getDirInfoList,
  getGitHubUserInfo,
  getRepoInfo,
  initRepoREADME
} from '@/common/api'
import { INIT_REPO_BARNCH, INIT_REPO_NAME } from '@/common/constant'
import router from '@/router'
import i18n from '@/plugins/vue/i18n'

const userConfigInfo = computed(() => store.getters.getUserConfigInfo).value

/**
 * 持久化用户图床配置信息
 */
export const persistUserConfigInfo = async () => {
  await store.dispatch('USER_CONFIG_INFO_PERSIST')
}

/**
 * 保存用户信息
 * @param userInfo
 */
export async function saveUserInfo(userInfo: any) {
  await store.dispatch('SET_USER_CONFIG_INFO', {
    logined: true,
    id: userInfo.id,
    owner: userInfo.login,
    name: userInfo.name,
    email: userInfo.email,
    avatarUrl: userInfo.avatar_url
  })
}

/**
 * 前往 [上传图片] 页面
 */
export const goUploadPage = async (inputRef: any) => {
  const { selectedDir, dirMode } = userConfigInfo
  let warningMessage: string = i18n.global.t('config_page.message_6')

  if (selectedDir === '') {
    // eslint-disable-next-line default-case
    switch (dirMode) {
      case DirModeEnum.newDir:
        warningMessage = i18n.global.t('config_page.message_7')
        inputRef?.focus()
        break
      case DirModeEnum.repoDir:
        warningMessage = i18n.global.t('config_page.message_8')
        break
    }
    ElMessage.warning({ message: warningMessage })
  } else {
    await router.push('/upload')
  }
}

/**
 * 一键自动配置图床
 */
export const oneClickAutoConfig = async (tokenInput: any) => {
  const { token } = userConfigInfo

  if (!token) {
    ElMessage.error({ message: i18n.global.t('config_page.message_1') })
    tokenInput?.focus()
    return
  }

  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('config_page.loading_6')
  })

  try {
    const userInfo = await getGitHubUserInfo(userConfigInfo.token)

    if (!userInfo) {
      loading.close()
      ElMessage.error({ message: i18n.global.t('config_page.message_2') })
      return
    }

    await saveUserInfo(userInfo)

    let isExistInitRepo: boolean = false
    const initRepoInfo = await getRepoInfo(userConfigInfo.owner, INIT_REPO_NAME)
    if (initRepoInfo) {
      isExistInitRepo = true
      await store.dispatch('SET_USER_CONFIG_INFO', {
        repoPrivate: initRepoInfo.private
      })
    }

    const repoInfo = await createRepo(userConfigInfo.token)
    if (!repoInfo) {
      loading.close()
      ElMessage.error({ message: i18n.global.t('config_page.message_3') })
      return
    }

    userConfigInfo.repo = INIT_REPO_NAME
    userConfigInfo.branch = INIT_REPO_BARNCH

    if (isExistInitRepo) {
      userConfigInfo.dirList = await getDirInfoList(userConfigInfo)
    }

    userConfigInfo.dirMode = DirModeEnum.rootDir
    userConfigInfo.selectedDir = '/'

    if (!isExistInitRepo) {
      await initRepoREADME(userConfigInfo)
    }
    await persistUserConfigInfo()
    loading.close()
    ElMessage.success({ message: i18n.global.t('config_page.message_4') })
    await router.push('/upload')
  } catch (err) {
    ElMessage.error({ message: i18n.global.t('config_page.message_5') })
    console.error('oneClickAutoConfig >> ', err)
  }
}
