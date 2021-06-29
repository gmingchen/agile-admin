<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 16:53:30
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:42:30
-->
<template>
  <div class="g-container">
    <el-form ref="formR" inline @keyup.enter="getList()">
      <el-form-item>
        <el-button v-if="isAuth('base:menu:create')" type="primary" @click="addEditHandle()">{{$t('button.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      class="g-table"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      lazy
      :load="loadHandle"
      :tree-props="props"
      row-key="id">
      <el-table-column
        header-align="center"
        :label="$t('base.menu.chineseName')"
        prop="name_cn"
        min-width="150" />
      <el-table-column
        align="center"
        :label="$t('base.menu.englishName')"
        prop="name_en"
        min-width="150">
        <template v-slot="{ row }">
          {{ row.name_en ? row.name_en : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.icon')"
        width="80">
        <template v-slot="{ row }">
          <svg-icon v-if="row.type !== 2" :name="row.icon || ''" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.type')"
        prop="type"
        width="90">
        <template v-slot="{ row }">
          <el-tag v-if="row.type === 0" size="small">{{ $t('base.menu.catalog') }}</el-tag>
          <el-tag v-else-if="row.type === 1" size="small" type="success">{{ $t('base.menu.menu') }}</el-tag>
          <el-tag v-else-if="row.type === 2" size="small" type="info">{{ $t('base.menu.button') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="URL"
        prop="url"
        min-width="150"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span v-if="row.type !== 0">{{ row.url }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        :label="$t('base.menu.authMark')"
        prop="permission"
        min-width="150"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span v-if="row.type !== 0">{{ row.permission }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        :label="$t('field.sort')"
        prop="sort"
        width="80" />
      <el-table-column
        align="center"
        :label="$t('field.is', [$t('base.menu.display')])"
        prop="is_display"
        min-width="90">
        <template v-slot="{ row }">
          <el-switch
            :disabled="!isAuth('base:menu:display')"
            @change="displayHandle(row)"
            v-model="row.is_display"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.is', [$t('base.menu.alive')])"
        prop="is_alive"
        min-width="110">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            :disabled="!isAuth('base:menu:alive')"
            @change="keepAliveHandle(row)"
            v-model="row.is_alive"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.is', [$t('base.menu.tab')])"
        prop="is_tab"
        min-width="130">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            :disabled="row.is_display === 0 || !isAuth('base:menu:tab')"
            @change="tabHandle(row)"
            v-model="row.is_tab"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.is', [$t('base.menu.multiple')])"
        prop="is_multiple"
        min-width="160">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            :disabled="row.is_display === 0 || row.is_tab === 0 || !isAuth('base:menu:multiple')"
            @change="multipleHandle(row)"
            v-model="row.is_multiple"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.operation')"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-if="isAuth('base:menu:update')"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">{{ $t('button.edit') }}</el-button>
          <el-button
            v-if="isAuth('base:menu:delete')"
            type="text"
            size="small"
            @click="delHandle(row.id)">{{ $t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="addEdit" v-if="visible" @refresh="setList" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import { setTab, setAlive, setDisplay, getList, setMultiple, del } from '@/api/develop/menu'
import AddEdit from './components/add-edit.vue'
import { IFn } from '@/types'
import { Axios } from '@/types/axios'
import { Menu } from '@/types/menu'
import { El } from '@/types/el'

@Options({
  components: { AddEdit }
})
export default class extends Vue {
  @Inject('isAuth') isAuth!: (arg: string) => boolean

  protected loading: boolean = false
  protected visible: boolean = false

  protected props = { children: 'children', hasChildren: 'hasChildren' }
  protected list: Menu.Vo[] = []

  created(): void {
    this.setList()
  }

  /**
   * @description: 设置列表值
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  async setList(): Promise<void> {
    this.loading = true
    this.list = (await this.getList()).data || []
    this.$nextTick(() => {
      this.loading = false
    })
  }

  /**
   * @description: 父级ID获取菜单
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  async getList(parentId = 0): Promise<Axios.Response<Menu.Vo[]>> {
    const params = {
      parent_id: parentId
    }
    const r = await getList(params)
    if (r) {
      r.data.forEach(item => {
        if (item.type !== 2) {
          item.hasChildren = true
        }
      })
    }
    return r
  }

  /**
   * @description: 懒加载事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  loadHandle(row: Menu.Vo, _treeNode: El.TreeNode<Menu.Vo>, resolve: IFn): void {
    this.getList(row.id!).then(r => {
      if (r) {
        resolve(r.data)
      } else {
        resolve([])
      }
    })
  }

  /**
   * @description: 新增/编辑弹窗
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  addEditHandle(id?: number): void {
    this.visible = true
    this.$nextTick(() => {
      this.$refs.addEdit.init(id)
    })
  }

  /**
   * @description: 删除
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  delHandle(id: number): void {
    this.$confirm(this.$t('tip.confirmTips', [id, this.$t('button.delete')]), this.$t('tip.tips'), {
      confirmButtonText: this.$t('button.confirm'),
      cancelButtonText: this.$t('button.cancel'),
      type: 'warning'
    })
      .then(() => {
        const params = {
          id: id
        }
        del(params).then(r => {
          if (r) {
            this.$message({
              message: this.$t('tip.success'),
              type: 'success'
            })
            this.setList()
          }
        })
      })
      .catch(() => {
        // to do something on canceled
      })
  }

  /**
   * @description: 是否显示
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  displayHandle(row: Menu.Vo): void {
    if (row.id) {
      const params = {
        key: row.id,
        value: row.is_display
      }
      setDisplay(params).then(r => {
        if (r) {
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
        } else {
          row.is_display = row.is_display === 1 ? 0 : 1
        }
      })
    }
  }

  /**
   * @description: 是否缓存
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  keepAliveHandle(row: Menu.Vo): void {
    if (row.id) {
      const params = {
        key: row.id,
        value: row.is_alive
      }
      setAlive(params).then(r => {
        if (r) {
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
        } else {
          row.is_alive = row.is_alive === 1 ? 0 : 1
        }
      })
    }
  }

  /**
   * @description: 是否在tab显示
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  tabHandle(row: Menu.Vo): void {
    if (row.id) {
      const params = {
        key: row.id,
        value: row.is_tab
      }
      setTab(params).then(r => {
        if (r) {
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
        } else {
          row.is_tab = row.is_tab === 1 ? 0 : 1
        }
      })
    }
  }

  /**
   * @description: 是否支持tab多开
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  multipleHandle(row: Menu.Vo): void {
    if (row.id) {
      const params = {
        key: row.id,
        value: row.is_multiple
      }
      setMultiple(params).then(r => {
        if (r) {
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
        } else {
          row.is_multiple = row.is_multiple === 1 ? 0 : 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
