<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 13:27:39
-->
<template>
  <div class="base-container">
    <el-table class="base-table" border :data="list">
      <el-table-column header-align="center" align="center" label="是否显示" prop="display">
        <template v-slot="scope">
          <el-switch
            @change="displayHandle(scope.row)"
            v-model="val"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { IObject } from '@U/index.type'

@Options({})
export default class extends Vue {
  protected list: Array<IObject> = [
    {
      display: 1
    }
  ]

  val: number = 1

  displayHandle(data: IObject): void {
    console.log(data)
  }
}
</script>

<style lang="scss" scoped></style>
