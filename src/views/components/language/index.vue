<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-08 09:47:15
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 18:05:11
-->
<template>
  <div class="language">
    <el-dropdown trigger="click" @command="commandHandle">
      <span class="link">
        <svg-icon name="language" />
        {{ lang }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="cn">{{ t('language.chinese') }}</el-dropdown-item>
          <el-dropdown-item command="en">{{ t('language.english') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore, key } from '@/store'

import { LanguageType } from '@/types'

export default defineComponent({
  setup() {
    const { t, locale } = useI18n()
    const store = useStore(key)

    const getLang = (): string => {
      let result: string
      switch (store.state.setting.set.language) {
        case LanguageType.Chinese:
          result = t('language.chinese')
          break
        case LanguageType.English:
          result = t('language.english')
          break
        default:
          result = t('language.chinese')
          break
      }
      return result
    }

    const lang = computed(() => getLang())

    const commandHandle = (command: string): void => {
      if (store.state.setting.set.language === command) {
        return
      }
      locale.value = command
      store.dispatch('setting/setLanguage', command)
    }

    return {
      t,
      lang,
      commandHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'Sass/_variable.scss';
.language {
  .link {
    cursor: pointer;
    &:hover {
      color: $brandColor;
    }
  }
}
</style>
