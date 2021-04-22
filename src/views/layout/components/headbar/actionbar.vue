<template>
  <div class="actionbar-wrap">
    <div :style="style">
      <div class="action-item" @click="$router.push({ name: 'set' })">
        <svg-icon name="set" />
      </div>
      <div class="action-item" @click="fullScreenHandle()">
        <svg-icon :name="set.fullScreen ? 'exit-full-screen' : 'full-screen'" />
      </div>
      <div class="action-item" @click="refreshHandle()">
        <svg-icon name="refresh" />
      </div>
      <div class="action-item" @click="clearHandle()">
        <svg-icon name="clear" />
      </div>
      <language class="action-item" />
      <div class="action-item">
        <el-skeleton :loading="!user.username" animated :style="{ 'margin-top': (navbar.headHeight - 40) / 2 + 'px' }">
          <template #template>
            <div class="skeleton">
              <el-skeleton-item variant="image" class="portrait" />
              <el-skeleton-item variant="text" class="text" />
            </div>
          </template>
          <template #default>
            <el-dropdown
              trigger="click"
              :style="{ 'margin-top': (navbar.headHeight - 40) / 2 + 'px' }"
              @command="selfHandle">
              <div>
                <el-avatar class="portrait" v-if="user.avatar" :src="portrait" />
                <el-avatar class="portrait" v-else>{{ user.nickname ? user.nickname.substr(0, 1) : 'user' }}</el-avatar>
                <!-- <el-image class="portrait" :src="portrait" /> -->
                <span class="username">{{ user.nickname }}</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="webHub">
                    <svg-icon name="github" color="black" />
                    Web-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="javaHub">
                    <svg-icon name="github" color="black" />
                    Java-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="webEe">
                    <svg-icon name="gitee" color="#C71D23" />
                    Web-Gitee
                  </el-dropdown-item>
                  <el-dropdown-item command="javaEe">
                    <svg-icon name="gitee" color="#C71D23" />
                    Java-Gitee
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">{{ $t('button.editInfo') }}</el-dropdown-item>
                  <el-dropdown-item command="exit">{{ $t('button.logout') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-skeleton>
      </div>
    </div>
    <edit-info ref="editInfo" v-if="visible" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import screenfull from 'screenfull'
import Language from '@V/components/language/index.vue'
import EditInfo from '../edit-info/index.vue'
import portrait from '@IMG/portrait.gif'
import { INavbar, ISet } from '@/store/modules/common/index.type'
import { logout } from '@/api/login'
import { IUser } from '@/api/login/index.type'
import { IObject } from '@/utils/index.type'

const commonModule = namespace('common')
const userModule = namespace('user')

@Options({
  components: { Language, EditInfo }
})
export default class extends Vue {
  protected portrait: string = portrait + '?' + +new Date()
  @Inject('navbar') readonly navbar!: INavbar
  @Inject('style') readonly style!: IObject

  @userModule.State('user')
  readonly user!: IUser
  @commonModule.State('set')
  readonly set!: ISet
  @commonModule.Action('setFullScreen')
  setFullScreen!: (arg: boolean) => void
  @commonModule.Action('setRefresh')
  setRefresh!: (arg: boolean) => void
  @commonModule.Action('clear')
  clear!: () => void

  protected visible: boolean = false

  /**
   * @description: 设置全屏
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  fullScreenHandle(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle()
      this.setFullScreen(!screenfull.isFullscreen)
    } else {
      this.$message({
        message: `Your browser doesn't support full screen`,
        type: 'warning'
      })
    }
  }

  /**
   * @description: 组件刷新事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  refreshHandle(): void {
    this.setRefresh(true)
    this.$nextTick(() => {
      this.setRefresh(false)
    })
  }

  /**
   * @description: 清楚缓存
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  clearHandle(): void {
    this.$loading({
      lock: true,
      text: '清理缓存',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    this.clear()
  }

  /**
   * @description: 头像下拉菜单操作
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  selfHandle(command: string): void {
    switch (command) {
      case 'webHub':
        window.open('https://github.com/1240235512/vue3.git')
        break
      case 'javaHub':
        window.open('https://github.com/1240235512/spring-boot.git')
        break
      case 'webEe':
        window.open('https://gitee.com/shychen/vue3.git')
        break
      case 'javaEe':
        window.open('https://gitee.com/shychen/spring-boot.git')
        break
      case 'edit':
        this.visible = true
        this.$nextTick(() => {
          this.$refs.editInfo.init()
        })
        break
      case 'exit':
        this.$confirm(this.$t('tip.exitAccount'), this.$t('tip.tips'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then((): void => {
          logout().then(r => {
            if (r) {
              this.$router.replace({ name: 'login' })
            }
          })
        }).catch((): void => {
          // to do something
        })
        break
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_variable.scss';
.actionbar-wrap {
  height: 100%;
  .action-item {
    height: 100%;
    float: left;
    &, .link {
      cursor: pointer;
      &:hover {
        color: $brandColor;
      }
    }
    .portrait {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .skeleton {
    display: flex;
    align-items: center;
    justify-items: space-between;
    .text {
      width: 80px;
      height: 20px
    }
  }
  ::v-deep(.action-item + .action-item) {
    margin-left: 10px;
  }
}
</style>
