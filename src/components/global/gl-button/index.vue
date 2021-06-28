<script>
import { h, defineComponent } from 'vue'
const sort = {
  'save': '保存', // 保存
  'confirm': '确认', // 确认
  'back': '返回', // 返回
  'cancel': '取消', // 取消
  'query': '查询', // 查询
  'reset': '重置', // 重置
  'add': '新增', // 新增
  'edit': '编辑', // 编辑
  'delete': '删除', // 删除
  'enable': '启用', // 启用
  'disable': '禁用', // 禁用
  'implement': '立即执行', // 执行
  'recovery': '恢复', // 恢复
  'pause': '暂停', // 暂停
  'login': '登录', // 登录
  'clear': '清除', // 清除
  'upload': '上传', // 上传
  'download': '下载', // 下载
  'home': '首页', // 首页
  'backup': '备份', // 备份
  'clearDatabase': '清除数据库', // 清除数据库
  'batchDelete': '批量删除', // 批量删除
  'batchImplement': '批量立即执行', // 批量执行
  'batchRecovery': '批量恢复', // 批量恢复
  'batchPause': '批量暂停' // 批量暂停
}
export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    sort: {
      type: String,
      default: 'confirm',
      validator: (val) => {
        const arr = []
        for (const key in sort) {
          arr.push(key)
        }
        return arr.includes(val)
      }
    }
  },
  setup(props) {
    return () => h(<el-button>{ sort[props.sort] }</el-button>, { ...props })
  }
})
</script>

<style>

</style>
