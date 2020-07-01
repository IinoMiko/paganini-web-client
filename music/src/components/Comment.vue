<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg" style="display:flex;">
        <div class="comment-img" style="width:70px;">
          <img :src=attachImageUrl(avator) alt="" style="width:100%">
        </div>
        <el-input
          class="comment-input"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <el-button type="primary" class="sub-btn" @click="postComment()">评论</el-button>
    </div>
    <p>精彩评论: 共 {{commentList.length}} 条评论</p>
    <ul class="popular" v-for="(item, index) in commentList" :key="index" style="width:100%;">
      <li>
        <div class="popular-img" style="width:50px;">
          <img :src=attachImageUrl(userPic[index]) alt="" style="width:100%">
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{userName[index]}}</li>
            <li class="time">{{item.createTime}}</li>
            <li class="content">{{item.content}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import { mapGetters } from 'vuex'
import { getUserOfId, setComment, getAllComment } from '../api/index'

export default {
  name: 'comment',
  mixins: [mixin],
  props: [
    'playId', // 歌曲ID
  ],
  data () {
    return {
      imgurl: require('@/assets/zan.png'),
      commentList: [], // 存放评论内容
      userPic: [], // 保存评论用户头像
      userName: [], // 保存评论用户名字
      textarea: '' // 存放输入内容
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'userId', // 用户ID
      'index', // 列表中的序号
      'loginIn', // 用户是否登录
      'avator' // 用户头像
    ])
  },
  watch: {
    id () {
      this.getComment()
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    // 获取所有评论
    getComment () {
      getAllComment(this.playId)
        .then(res => {
          this.commentList = res
          for (let item of res) {
            this.getUsers(item.userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取评论用户的昵称和头像
    getUsers (id) {
      getUserOfId(id)
        .then(res => {
          this.userPic.push(res[0].avator)
          this.userName.push(res[0].username)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交评论
    postComment () {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('userId', this.userId)
        params.append('songId', this.playId)
        params.append('content', this.textarea)
        setComment(params)
          .then(res => {
            if (res.code === 1) {
              this.textarea = ''
              this.getComment()
              this.notify('评论成功', 'success')
            } else {
              this.notify('评论失败', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('请先登录', 'warning')
      }
    }
  }
}
</script>

<style scoped>
/*评论*/
.comment-input {
    margin-left: 10px;
    flex: 1;
}
.sub-btn {
    margin-top: 10px;
    margin-left: 90%;
}

h2 {
    margin-bottom: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid;
}

/*热门评论*/
.popular > li {
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    display: flex;
}

.popular-msg {
    padding: 0 20px;
    flex: 1;
}
.content {
    font-size: 1rem;
}
.time {
    font-size: 0.6rem;
    color: rgba(0, 0, 0, 0.5);
}
.popular-msg li {
    width: 100%;
}
.up {
    width: 50px;
    line-height: 60px;
}
.zan {
    width: 1em;
    height: 1em;
    overflow: hidden;
    position: relative;
}
</style>