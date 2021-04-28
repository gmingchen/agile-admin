<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-08 09:47:15
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-15 20:20:58
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
          <el-dropdown-item command="cn">{{ $t('language.chinese') }}</el-dropdown-item>
          <el-dropdown-item command="en">{{ $t('language.english') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { LanguageType } from '@/types'

const commonModule = namespace('common')
export default class extends Vue {
  @commonModule.Getter('language')
  readonly language!: string
  @commonModule.Action('setLanguage')
  setLanguage!: (arg: string) => void

  get lang(): string {
    return this.getLang()
  }

  /**
   * @description: 初始化
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getLang(): string {
    let result: string
    switch (this.language) {
      case LanguageType.Chinese:
        result = this.$t('language.chinese')
        break
      case LanguageType.English:
        result = this.$t('language.english')
        break
      default:
        result = this.$t('language.chinese')
        break
    }
    return result
  }

  /**
   * @description: 语言设置点击事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  commandHandle(command: string): void {
    if (this.language === command) {
      return
    }
    this['$i18n'].locale = command
    this.setLanguage(command)
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_variable.scss';
.language {
  .link {
    cursor: pointer;
    &:hover {
      color: $brandColor;
    }
  }
}
</style>
