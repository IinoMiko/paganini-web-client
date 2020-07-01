<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span>歌曲</span>
    </nav>
    <searchSongs></searchSongs>
  </div>
</template>

<script>
import searchSongs from '../components/search/SearchSongs'
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'

export default {
  name: 'search',
  components: {
    searchSongs,
  },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'searchword'
    ])
  },
  watch: {
    searchword: function () {
      this.getSong()
    }
  }
}
</script>

<style scoped>
.search{
    margin: auto;
    margin-top: 90px;
    background-color: #1abc9c;
    border-radius: 12px;
    width: 900px;
    position: relative;
}

.searchList-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 20px;
    font-size: 1.5rem;
}
.searchList-nav span {
    line-height: 50px;
    cursor: pointer;
}

</style>
