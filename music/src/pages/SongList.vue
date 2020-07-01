<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li @click="getSongList">全部歌单</li>
    </ul>
    <div class="song-content">
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
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { mapGetters } from 'vuex'
import { getSongLis } from '../api/index'

export default {
  name: 'song-list',
  components: {
    ContentList
  },
  data () {
    return {
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: [] // 歌单
    }
  },
  computed: {
    ...mapGetters([
      'songsList'
    ]),
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
    // 获取全部歌单
    getSongList (page) {
      getSongList()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.song-list {
    margin: 30px 150px;
    margin-top: 70px;
    padding-bottom: 50px;
    min-width: 800px;
    background-color: #fff;
}

.song-list-header {
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
    color: #1abc9c;
    cursor: pointer;
}

.pagination {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>
