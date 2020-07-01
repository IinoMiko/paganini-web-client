<template>
  <div class="singer">
    <ul class="singer-header">
      <li @click="getAllSinger">全部歌手</li>
    </ul>
    <content-list :contentList="data"></content-list>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="albumDatas.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { getAllSinger} from '../api/index'

export default {
  name: 'singer',
  components: {
    ContentList
  },
  data () {
    return {
        pageSize: 15, // 页数
        currentPage: 1, // 当前页
        albumDatas: []
    }
  },
  computed: {
    // 计算当前表格中的数据
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 获取所有歌手
    getAllSinger () {
      getAllSinger()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
div,
ul,
li {
    box-sizing: border-box;
}

.singer {
    margin: 30px 10%;
    margin-top: 70px;
    padding-bottom: 50px;
    background-color: #fff;
}
.singer-header {
    width: 100%;
    padding: 0 40px;
}
li {
    display: inline-block;
    line-height: 40px;
    margin: 40px 20px 15px 20px;
    font-size: 20px;
    font-weight: 400;
    border-bottom: none;
    cursor: pointer;
}
li.active {
    color: #1abc9c;
    font-weight: 600;
    border-bottom: 4px solid 1abc9c;
}
.pagination {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>