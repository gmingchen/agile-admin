<script setup>
import { ThemeMode } from '@/utils/enum'

const themeStore = useThemeStore()

const mode = computed({
  get: () => {
    return themeStore.mode
  },
  set: (val) => {
    themeStore.mode = val
    themeStore.setTheme()
  }
})

const sidebar = computed({
  get: () => {
    return themeStore.layout.menuLayoutMode
  },
  set: (val) => {
    themeStore.layout.menuLayoutMode = val
    themeStore.setTheme()
  }
})
const navigation = computed({
  get: () => {
    return themeStore.layout.navigationMode
  },
  set: (val) => {
    themeStore.layout.navigationMode = val
    themeStore.setTheme()
  }
})
const contanier = computed({
  get: () => {
    return themeStore.layout.contanierMode
  },
  set: (val) => {
    themeStore.layout.contanierMode = val
    themeStore.setTheme()
  }
})
const panel = computed({
  get: () => {
    return themeStore.layout.panelMode
  },
  set: (val) => {
    themeStore.layout.panelMode = val
    themeStore.setTheme()
  }
})
const tabs = computed({
  get: () => {
    return themeStore.layout.showTabs
  },
  set: (val) => {
    themeStore.layout.showTabs = val
    themeStore.setTheme()
  }
})

const colorPrimary = computed({
  get: () => {
    return themeStore.color.main.primary
  },
  set: (val) => {
    themeStore.color.main.primary = val
    themeStore.setTheme()
  }
})
const colorSuccess = computed({
  get: () => {
    return themeStore.color.main.success
  },
  set: (val) => {
    themeStore.color.main.success = val
    themeStore.setTheme()
  }
})
const colorWarning = computed({
  get: () => {
    return themeStore.color.main.warning
  },
  set: (val) => {
    themeStore.color.main.warning = val
    themeStore.setTheme()
  }
})
const colorDanger = computed({
  get: () => {
    return themeStore.color.main.danger
  },
  set: (val) => {
    themeStore.color.main.danger = val
    themeStore.setTheme()
  }
})
const colorError = computed({
  get: () => {
    return themeStore.color.main.error
  },
  set: (val) => {
    themeStore.color.main.error = val
    themeStore.setTheme()
  }
})
const colorInfo = computed({
  get: () => {
    return themeStore.color.main.info
  },
  set: (val) => {
    themeStore.color.main.info = val
    themeStore.setTheme()
  }
})

const textPrimary = computed({
  get: () => {
    return themeStore.color.text.primary
  },
  set: (val) => {
    themeStore.color.text.primary = val
    themeStore.setTheme()
  }
})
const textRegular = computed({
  get: () => {
    return themeStore.color.text.regular
  },
  set: (val) => {
    themeStore.color.text.regular = val
    themeStore.setTheme()
  }
})
const textSecondary = computed({
  get: () => {
    return themeStore.color.text.secondary
  },
  set: (val) => {
    themeStore.color.text.secondary = val
    themeStore.setTheme()
  }
})
const textPlaceholder = computed({
  get: () => {
    return themeStore.color.text.placeholder
  },
  set: (val) => {
    themeStore.color.text.placeholder = val
    themeStore.setTheme()
  }
})
const textDisabled = computed({
  get: () => {
    return themeStore.color.text.disabled
  },
  set: (val) => {
    themeStore.color.text.disabled = val
    themeStore.setTheme()
  }
})

const menuBackgroundColor = computed({
  get: () => {
    return themeStore.color.menu.backgroundColor
  },
  set: (val) => {
    themeStore.color.menu.backgroundColor = val
    themeStore.setTheme()
  }
})
const menuTextColor = computed({
  get: () => {
    return themeStore.color.menu.textColor
  },
  set: (val) => {
    themeStore.color.menu.textColor = val
    themeStore.setTheme()
  }
})
const menuActiveTextColor = computed({
  get: () => {
    return themeStore.color.menu.activeTextColor
  },
  set: (val) => {
    themeStore.color.menu.activeTextColor = val
    themeStore.setTheme()
  }
})

const visible = ref(false)
const sidebars = ref([
  { label: '经典模式', value: 1 },
  { label: '分栏模式', value: 2 },
  { label: '上下模式', value: 3 }
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
