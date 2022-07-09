<template>
  <el-drawer
    v-model="visible"
    :with-header="false"
    append-to-body>
    <el-scrollbar>
      <div class="tips-box">如需重置，可在导航栏进行清除缓存操作！</div>
      <el-form label-width="100px">
        <el-divider>模式</el-divider>
        <el-form-item label="暗黑模式">
          <el-switch
            class="margin_r-15"
            v-model="mode"
            :active-value="ThemeMode.DARK"
            :inactive-value="ThemeMode.LIGHT"
            inline-prompt
            active-text="黑"
            inactive-text="亮"
            active-color="#222222" />
        </el-form-item>
        <el-divider>布局</el-divider>
        <el-form-item label="导航栏模式">
          <el-select v-model="navigation">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in navigations"
              :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容容器模式">
          <el-select v-model="contanier">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in contaniers"
              :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="面板模式">
          <el-select v-model="panel">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in panels"
              :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签页">
          <el-switch
            class="margin_r-15"
            v-model="tabs"
            inline-prompt
            :active-color="mode === ThemeMode.DARK ? '#222222' : ''" />
        </el-form-item>
        <el-divider>颜色</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Primary">
              <el-color-picker v-model="colorPrimary" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Success">
              <el-color-picker v-model="colorSuccess" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Warning">
              <el-color-picker v-model="colorWarning" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Danger">
              <el-color-picker v-model="colorDanger" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Error">
              <el-color-picker v-model="colorError" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Info">
              <el-color-picker v-model="colorInfo" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--
 <el-divider>字体颜色</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Primary">
              <el-color-picker v-model="textPrimary" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Regular">
              <el-color-picker v-model="textRegular" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Secondary">
              <el-color-picker v-model="textSecondary" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Placeholder">
              <el-color-picker v-model="textPlaceholder" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Disabled">
              <el-color-picker v-model="textDisabled" />
            </el-form-item>
          </el-col>
        </el-row>
-->
        <el-divider>侧边栏</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="背景色">
              <el-color-picker v-model="menuBackgroundColor" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字体颜色">
              <el-color-picker v-model="menuTextColor" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选中字体颜色">
              <el-color-picker v-model="menuActiveTextColor" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
  </el-drawer>
</template>

<script >
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import { ThemeMode } from '@/utils/dictionary'

export default defineComponent({
  setup() {
    const store = useStore()

    /**
     * 主题颜色处理
     */
    const paramsHandle = (type, key, value) => {
      const theme = {
        color: {
          ...store.state.theme.theme.color
        },
        text: {
          ...store.state.theme.theme.text
        },
        menu: {
          ...store.state.theme.theme.menu
        }
      }
      theme[type][key] = value
      return theme
    }

    const mode = computed({
      get: () => {
        return store.state.theme.mode
      },
      set: (val) => {
        store.dispatch('theme/setMode', val)
      }
    })

    const navigation = computed({
      get: () => {
        return store.state.settings.navigationMode
      },
      set: (val) => {
        store.dispatch('settings/setNavigationMode', val)
      }
    })
    const contanier = computed({
      get: () => {
        return store.state.settings.contanierMode
      },
      set: (val) => {
        store.dispatch('settings/setContanierMode', val)
      }
    })
    const panel = computed({
      get: () => {
        return store.state.settings.panelMode
      },
      set: (val) => {
        store.dispatch('settings/setPanelMode', val)
      }
    })
    const tabs = computed({
      get: () => {
        return store.state.settings.showTabs
      },
      set: (val) => {
        store.dispatch('settings/setShowTabs', val)
      }
    })

    const colorPrimary = computed({
      get: () => {
        return store.state.theme.theme.color.primary
      },
      set: (val) => {
        const theme = paramsHandle('color', 'primary', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const colorSuccess = computed({
      get: () => {
        return store.state.theme.theme.color.success
      },
      set: (val) => {
        const theme = paramsHandle('color', 'success', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const colorWarning = computed({
      get: () => {
        return store.state.theme.theme.color.warning
      },
      set: (val) => {
        const theme = paramsHandle('color', 'warning', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const colorDanger = computed({
      get: () => {
        return store.state.theme.theme.color.danger
      },
      set: (val) => {
        const theme = paramsHandle('color', 'danger', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const colorError = computed({
      get: () => {
        return store.state.theme.theme.color.error
      },
      set: (val) => {
        const theme = paramsHandle('color', 'error', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const colorInfo = computed({
      get: () => {
        return store.state.theme.theme.color.info
      },
      set: (val) => {
        const theme = paramsHandle('color', 'info', val)
        store.dispatch('theme/setTheme', theme)
      }
    })

    // const textPrimary = computed({
    //   get: () => {
    //     return store.state.theme.theme.text.primary
    //   },
    //   set: (val) => {
    //     const theme = paramsHandle('text', 'primary', val)
    //     store.dispatch('theme/setTheme', theme)
    //   }
    // })
    // const textRegular = computed({
    //   get: () => {
    //     return store.state.theme.theme.text.regular
    //   },
    //   set: (val) => {
    //     const theme = paramsHandle('text', 'regular', val)
    //     store.dispatch('theme/setTheme', theme)
    //   }
    // })
    // const textSecondary = computed({
    //   get: () => {
    //     return store.state.theme.theme.text.secondary
    //   },
    //   set: (val) => {
    //     const theme = paramsHandle('text', 'secondary', val)
    //     store.dispatch('theme/setTheme', theme)
    //   }
    // })
    // const textPlaceholder = computed({
    //   get: () => {
    //     return store.state.theme.theme.text.placeholder
    //   },
    //   set: (val) => {
    //     const theme = paramsHandle('text', 'placeholder', val)
    //     store.dispatch('theme/setTheme', theme)
    //   }
    // })
    // const textDisabled = computed({
    //   get: () => {
    //     return store.state.theme.theme.text.disabled
    //   },
    //   set: (val) => {
    //     const theme = paramsHandle('text', 'disabled', val)
    //     store.dispatch('theme/setTheme', theme)
    //   }
    // })

    const menuBackgroundColor = computed({
      get: () => {
        return store.state.theme.theme.menu.backgroundColor
      },
      set: (val) => {
        const theme = paramsHandle('menu', 'backgroundColor', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const menuTextColor = computed({
      get: () => {
        return store.state.theme.theme.menu.textColor
      },
      set: (val) => {
        const theme = paramsHandle('menu', 'textColor', val)
        store.dispatch('theme/setTheme', theme)
      }
    })
    const menuActiveTextColor = computed({
      get: () => {
        return store.state.theme.theme.menu.activeTextColor
      },
      set: (val) => {
        const theme = paramsHandle('menu', 'activeTextColor', val)
        store.dispatch('theme/setTheme', theme)
      }
    })

    const data = reactive({
      visible: false,
      navigations: [
        { label: '固定导航', value: 1 },
        { label: '不固定导航', value: 2 }
      ],
      contaniers: [
        { label: '大小随内容变化', value: 1 },
        { label: '大小100%(固定导航栏的情况下生效)', value: 2 }
      ],
      panels: [
        { label: '头部、主要内容、脚部、左侧分离', value: 1 },
        { label: '左右面板分离', value: 2 },
        { label: '整个容器为面板', value: 3 }
      ]
    })

    const init = () => {
      data.visible = true
    }

    return {
      mode,
      navigation,
      contanier,
      panel,
      tabs,

      colorPrimary,
      colorSuccess,
      colorWarning,
      colorDanger,
      colorError,
      colorInfo,

      // textPrimary,
      // textRegular,
      // textSecondary,
      // textPlaceholder,
      // textDisabled,

      menuBackgroundColor,
      menuTextColor,
      menuActiveTextColor,

      ...toRefs(data),
      ThemeMode,
      init
    }
  }
})
</script>

<style lang="scss" scoped>
.tips-box {
  width: fit-content;
  margin: 0 auto;
  padding: 15px 15px 15px 20px;
  font-size: 14px;
  color: var(--el-color-warning);
  background-color: var(--el-color-warning-light-9);
  border-radius: var(--el-border-radius-base);
  border-color: var(--el-color-warning-light-8);
}
</style>
