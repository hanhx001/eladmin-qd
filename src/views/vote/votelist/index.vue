<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入岗位名称搜索" style="width: 200px;" class="filter-item"/>

      <el-select v-model="query.enabled" clearable placeholder="状态" class="filter-item" style="width: 90px">
        <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="_toQuery">搜索</el-button>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
      <!-- 导出
      <div style="display: inline-block;">
        <el-button
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="warning"
          icon="el-icon-download"
          @click="download">导出</el-button>
      </div>
      -->
    </div>
    <!--表单组件-->
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;" class="table-temp">
      <el-table-column prop="sort" label="序号" width="50" align="center" type="index" :index="indexMethod">
        <!-- <template slot-scope="scope">
          {{ scope.row }}
        </template> -->
      </el-table-column>
      <el-table-column prop="topicName" label="投票标题" align="center" />
      <el-table-column prop="sort" label="人员" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.operator }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
       <template slot-scope="scope">
          {{ scope.row.enabled ? '发布' : '下线'}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="280" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-permission="['admin','job:edit']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['admin','job:del']"
            :ref="scope.$index"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.$index, scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { del, query } from '@/api/vote'
import { parseTime } from '@/utils/index'

export default {
  name: 'voteList',
  components: {  },
  dicts: ['dept_status'],
  data() {
    return {
      data: [],
      delLoading: false,
      loading: false,
      page: 0,
      total: 0,
      size: 10,
      query: {
        value: '',
        enabled: ''
      },
      enabledTypeOptions: [
        { key: 'true', display_name: '发布' },
        { key: 'false', display_name: '下线' }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this._toQuery('init');
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/voteTopic'
      const sort = 'sort,asc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const value = query.value
      const enabled = query.enabled
      if (value) { this.params['name'] = value }
      if (query.date) {
        this.params['startTime'] = query.date[0]
        this.params['endTime'] = query.date[1]
      }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    subDelete(idx, id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[idx].doClose()
        this.data.splice(idx, 1)
        this.dleChangePage()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
        this._toQuery();
      }).catch(err => {
        this.delLoading = false
        this.$refs[idx].doClose()
      })
    },
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    },
    add() {
      this.$router.push({
        path: '/vote/addvote',
      })
    },
    edit(data) {
      this.$router.push({
        path: '/vote/editvote?id=' + data.id,
      });
    },
    _toQuery(str) {
      var data = {
        page: this.page,
        size: this.size,
        enabled: this.query.enabled,
        topicName: this.query.value
      }
      this.loading = true
      query(data).then(res => {
        this.loading = false
        this.data = res.content
        this.total = res.totalElements
      }).catch(err => {
        console.log(err)
      }).catch(() => {
        
      })
    },
    indexMethod(index) {
      return index + 1 + this.size * this.page
    },
    pageChange(e) {
      this.page = e - 1
      this._toQuery()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
    },
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.job_status[val] + '" ' + data.name + '岗位, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        edit(data).then(res => {
          this.$notify({
            title: this.dict.label.job_status[val] + '成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    download() {
      this.beforeInit()
      this.downloadLoading = true
      downloadJob(this.params).then(result => {
        downloadFile(result, '岗位列表', 'xlsx')
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style scoped>
    .table-temp div.cell{
      text-align: center!important;
    }
</style>
