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
        <el-form-item label="侧边栏模式">
          <el-select v-model="sidebar">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in sidebars"
              :key="item.value" />
          </el-select>
        </el-form-item>
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

<script setup>
import { computed, ref } from 'vue'

import { useThemeStore } from '@stores/theme'
import { useSettingsStore } from '@stores/settings'

import { ThemeMode } from '@/utils/dictionary'

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()

/**
 * 主题颜色处理
 */
const paramsHandle = (type, key, value) => {
  const theme = {
    color: {
      ...themeStore.theme.color
    },
    text: {
      ...themeStore.theme.text
    },
    menu: {
      ...themeStore.theme.menu
    }
  }
  theme[type][key] = value
  return theme
}

const mode = computed({
  get: () => {
    return themeStore.mode
  },
  set: (val) => {
    themeStore.setMode(val)
  }
})

const sidebar = computed({
  get: () => {
    return settingsStore.sidebarMode
  },
  set: (val) => {
    settingsStore.setSidebarMode(val)
  }
})
const navigation = computed({
  get: () => {
    return settingsStore.navigationMode
  },
  set: (val) => {
    settingsStore.setNavigationMode(val)
  }
})
const contanier = computed({
  get: () => {
    return settingsStore.contanierMode
  },
  set: (val) => {
    settingsStore.setContanierMode(val)
  }
})
const panel = computed({
  get: () => {
    return settingsStore.panelMode
  },
  set: (val) => {
    settingsStore.setPanelMode(val)
  }
})
const tabs = computed({
  get: () => {
    return settingsStore.showTabs
  },
  set: (val) => {
    settingsStore.setShowTabs(val)
  }
})

const colorPrimary = computed({
  get: () => {
    return themeStore.theme.color.primary
  },
  set: (val) => {
    const theme = paramsHandle('color', 'primary', val)
    themeStore.setTheme(theme)
  }
})
const colorSuccess = computed({
  get: () => {
    return themeStore.theme.color.success
  },
  set: (val) => {
    const theme = paramsHandle('color', 'success', val)
    themeStore.setTheme(theme)
  }
})
const colorWarning = computed({
  get: () => {
    return themeStore.theme.color.warning
  },
  set: (val) => {
    const theme = paramsHandle('color', 'warning', val)
    themeStore.setTheme(theme)
  }
})
const colorDanger = computed({
  get: () => {
    return themeStore.theme.color.danger
  },
  set: (val) => {
    const theme = paramsHandle('color', 'danger', val)
    themeStore.setTheme(theme)
  }
})
const colorError = computed({
  get: () => {
    return themeStore.theme.color.error
  },
  set: (val) => {
    const theme = paramsHandle('color', 'error', val)
    themeStore.setTheme(theme)
  }
})
const colorInfo = computed({
  get: () => {
    return themeStore.theme.color.info
  },
  set: (val) => {
    const theme = paramsHandle('color', 'info', val)
    themeStore.setTheme(theme)
  }
})

// const textPrimary = computed({
//   get: () => {
//     return themeStore.theme.text.primary
//   },
//   set: (val) => {
//     const theme = paramsHandle('text', 'primary', val)
//     themeStore.setTheme(theme)
//   }
// })
// const textRegular = computed({
//   get: () => {
//     return themeStore.theme.text.regular
//   },
//   set: (val) => {
//     const theme = paramsHandle('text', 'regular', val)
//     themeStore.setTheme(theme)
//   }
// })
// const textSecondary = computed({
//   get: () => {
//     return themeStore.theme.text.secondary
//   },
//   set: (val) => {
//     const theme = paramsHandle('text', 'secondary', val)
//     themeStore.setTheme(theme)
//   }
// })
// const textPlaceholder = computed({
//   get: () => {
//     return themeStore.theme.text.placeholder
//   },
//   set: (val) => {
//     const theme = paramsHandle('text', 'placeholder', val)
//     themeStore.setTheme(theme)
//   }
// })
// const textDisabled = computed({
//   get: () => {
//     return themeStore.theme.text.disabled
//   },
//   set: (val) => {
//     const theme = paramsHandle('text', 'disabled', val)
//     themeStore.setTheme(theme)
//   }
// })

const menuBackgroundColor = computed({
  get: () => {
    return themeStore.theme.menu.backgroundColor
  },
  set: (val) => {
    const theme = paramsHandle('menu', 'backgroundColor', val)
    themeStore.setTheme(theme)
  }
})
const menuTextColor = computed({
  get: () => {
    return themeStore.theme.menu.textColor
  },
  set: (val) => {
    const theme = paramsHandle('menu', 'textColor', val)
    themeStore.setTheme(theme)
  }
})
const menuActiveTextColor = computed({
  get: () => {
    return themeStore.theme.menu.activeTextColor
  },
  set: (val) => {
    const theme = paramsHandle('menu', 'activeTextColor', val)
    themeStore.setTheme(theme)
  }
})

const visible = ref(false)
const sidebars = ref([
  { label: '经典模式', value: 1 },
  { label: '分栏模式', value: 2 }
])
const navigations = ref([
  { label: '固定导航', value: 1 },
  { label: '不固定导航', value: 2 }
])
const contaniers = ref([
  { label: '大小随内容变化', value: 1 },
  { label: '大小100%(固定导航栏的情况下生效)', value: 2 }
])
const panels = ref([
  { label: '头部、主要内容、脚部、左侧分离', value: 1 },
  { label: '左右面板分离', value: 2 },
  { label: '整个容器为面板', value: 3 }
])

const init = () => {
  visible.value = true
}

defineExpose({
  init
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
